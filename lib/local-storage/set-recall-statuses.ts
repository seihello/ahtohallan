import { RecallStatusFilter } from "@/lib/types";

export function setRecallStatuses(recallStatuses: RecallStatusFilter[]) {
  localStorage.setItem("recallStatuses", recallStatuses.join(","));
}
