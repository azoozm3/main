import { useMemo, useState } from "react";

export function useBookAppointmentForm(doctor) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    reason: "",
    appointmentType: doctor?.onlineConsultation ? "online" : "in_person",
  });

  const doctorId = doctor?.id || doctor?._id || "";
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const canSubmit = useMemo(
    () => {
      if (!(doctorId && form.date && form.time)) return false;
      const selected = new Date(`${form.date}T${form.time}`);
      return Number.isFinite(selected.getTime()) && selected.getTime() > Date.now();
    },
    [doctorId, form.date, form.time],
  );
  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, doctorId, minDate, canSubmit, updateField };
}
