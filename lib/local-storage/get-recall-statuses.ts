import { RecallStatusFilter } from "@/lib/types";

const RECALL_STATUS_FILTERS: RecallStatusFilter[] = ["know", "seen", "new", "untouched"];

export function getRecallStatuses(): RecallStatusFilter[] {
  const stored = localStorage.getItem("recallStatuses");

  if (stored === null) return RECALL_STATUS_FILTERS;

  return stored.split(",").filter((value): value is RecallStatusFilter =>
    RECALL_STATUS_FILTERS.includes(value as RecallStatusFilter)
  );
}
