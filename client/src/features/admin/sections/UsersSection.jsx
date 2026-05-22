import { Button } from "@/components/ui/button";
import { AdminSectionCard } from "@/features/admin/components/AdminSectionCard";
import { AdminStatCard } from "@/features/admin/components/AdminStatCard";
import { AdminTable } from "@/features/admin/components/AdminTable";
import { formatDate, formatLabel, formatMoney } from "@/features/admin/utils/adminFormatters";
import { ProfileLink } from "@/components/common/ProfileLink";

export function UsersSection({ title, subtitle, data, mutationState, onToggleActive, onDelete }) {
  const users = data?.users || [];
  const summary = data?.summary || {};
  const role = users[0]?.role || "";
  const showProviderColumns = users.length > 0 && users.every((user) => user.role === role) && ["doctor", "nurse"].includes(role);
  const showApprovalAction = role === "nurse" || role === "volunteer";

  const columns = [
    { key: "name", label: "Name", render: (row) => <ProfileLink id={row.id || row._id} role={row.role}>{row.name}</ProfileLink> },
    { key: "role", label: "Role", render: (row) => formatLabel(row.role) },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "specialty", label: "Specialty", render: (row) => row.specialty || "—" },
    { key: "active", label: "Status", render: (row) => (row.active ? "Active" : "Inactive") },
  ];

  if (showProviderColumns) {
    columns.push(
      { key: "completedServices", label: "Completed" },
      { key: "unpaidJobs", label: "Unpaid Jobs" },
      { key: "dueAmount", label: "Due", render: (row) => formatMoney(row.dueAmount) },
      { key: "paidAmount", label: "Paid", render: (row) => formatMoney(row.paidAmount) },
    );
  }

  columns.push(
    { key: "createdAt", label: "Created", render: (row) => formatDate(row.createdAt) },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" disabled={mutationState} onClick={() => onToggleActive(row)}>
            {showApprovalAction ? (row.active ? "Approved" : "Approve") : (row.active ? "Disable" : "Enable")}
          </Button>
          <Button type="button" variant="destructive" size="sm" disabled={mutationState} onClick={() => onDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  );

  return (
    <div className="space-y-6">
      <div className={`grid gap-4 ${showProviderColumns ? "md:grid-cols-6" : "md:grid-cols-4"}`}>
        <AdminStatCard label="Total" value={summary.total || 0} />
        <AdminStatCard label="Active" value={summary.active || 0} />
        <AdminStatCard label="Inactive" value={summary.inactive || 0} />
        <AdminStatCard label="Online Consult" value={summary.onlineConsultationEnabled || 0} />
        {showProviderColumns ? <AdminStatCard label="Completed Jobs" value={summary.totalCompletedServices || 0} /> : null}
        {showProviderColumns ? <AdminStatCard label="Total Due" value={formatMoney(summary.totalDueAmount)} /> : null}
      </div>

      <AdminSectionCard title={title} subtitle={subtitle}>
        <AdminTable columns={columns} rows={users} emptyText="No users found." />
      </AdminSectionCard>
    </div>
  );
}
