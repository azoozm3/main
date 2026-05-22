import { formatDate, formatLabel, formatMoney } from "@/features/admin/utils/adminFormatters";
import { ProfileLink } from "@/components/common/ProfileLink";

export function createPayoutColumns(label, actionRenderer) {
  return [
    { key: "providerName", label, render: (row) => <ProfileLink id={row.providerId} role={row.providerType}>{row.providerName || "—"}</ProfileLink> },
    { key: "completedCount", label: "Completed" },
    { key: "capturedCount", label: "Captured" },
    { key: "unpaidJobs", label: "Unpaid Jobs" },
    { key: "paidJobs", label: "Paid Jobs" },
    { key: "providerNetAmount", label: "Net Total", render: (row) => formatMoney(row.providerNetAmount, row.currency) },
    { key: "dueAmount", label: "Due", render: (row) => formatMoney(row.dueAmount, row.currency) },
    { key: "paidAmount", label: "Paid", render: (row) => formatMoney(row.paidAmount, row.currency) },
    { key: "lastActivityAt", label: "Last Activity", render: (row) => formatDate(row.lastActivityAt) },
    { key: "actions", label: "Action", render: actionRenderer },
  ];
}

export const paymentDetailsColumns = [
  { key: "service", label: "Service" },
  { key: "providerType", label: "Type", render: (row) => formatLabel(row.providerType) },
  { key: "patientName", label: "Patient", render: (row) => <ProfileLink id={row.patientId} role="patient">{row.patientName || "—"}</ProfileLink> },
  { key: "providerName", label: "Provider", render: (row) => <ProfileLink id={row.providerId} role={row.providerType}>{row.providerName || "Unassigned"}</ProfileLink> },
  { key: "status", label: "Status", render: (row) => formatLabel(row.status) },
  { key: "paymentStatus", label: "Payment", render: (row) => formatLabel(row.payment?.paymentStatus) },
  { key: "payoutStatus", label: "Payout", render: (row) => formatLabel(row.payment?.providerPayoutStatus) },
  { key: "gross", label: "Gross", render: (row) => formatMoney(row.payment?.grossAmount, row.payment?.currency) },
  { key: "platformFee", label: "Fee", render: (row) => formatMoney(row.payment?.platformFee, row.payment?.currency) },
  { key: "providerNet", label: "Provider Net", render: (row) => formatMoney(row.payment?.providerNetAmount, row.payment?.currency) },
  { key: "createdAt", label: "Created", render: (row) => formatDate(row.createdAt) },
];
