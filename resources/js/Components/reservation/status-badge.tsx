import { Badge } from "@/Components/ui/badge"

type StatusType = "pending" | "confirmed" | "paid" | "canceled" | "completed"

interface StatusBadgeProps {
  status: StatusType
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          variant: "outline" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
        }
      case "confirmed":
        return {
          label: "Confirmed",
          variant: "outline" as const,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
        }
      case "paid":
        return {
          label: "Paid",
          variant: "outline" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
        }
      case "canceled":
        return {
          label: "Canceled",
          variant: "outline" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
        }
      case "completed":
        return {
          label: "Completed",
          variant: "outline" as const,
          className: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
        }
      default:
        return {
          label: status,
          variant: "outline" as const,
          className: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}