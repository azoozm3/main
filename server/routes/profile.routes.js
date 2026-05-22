import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth } from "./helpers.js";
import { createProfileHandlers } from "./profile/profileHandlers.js";

const uploadDir = path.resolve(process.cwd(), "uploads", "medical-history");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") return cb(new Error("PDF files only"));
    cb(null, true);
  },
});

export function registerProfileRoutes(app, { storage }) {
  const handlers = createProfileHandlers(storage);
  app.get("/api/profiles/me", requireAuth, handlers.readMe);
  app.get("/api/profiles/:id", handlers.readPublic);
  app.post("/api/patient-ratings", requireAuth, handlers.createPatientRating);
  app.patch("/api/profiles", requireAuth, handlers.updateMe);
  app.post("/api/profiles/medical-history/upload", requireAuth, upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "PDF file is required" });
    return res.json({ filePath: `/uploads/medical-history/${req.file.filename}` });
  });
}
