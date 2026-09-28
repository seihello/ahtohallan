import { TagFilter } from "@/lib/types";

export function setTagFilters(tagFilters: TagFilter[]) {
  localStorage.setItem("tagFilters", JSON.stringify(tagFilters));
}
