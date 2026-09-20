import { TagMatchMode } from "@/lib/types";

export function setTagMatchMode(tagMatchMode: TagMatchMode) {
  localStorage.setItem("tagMatchMode", tagMatchMode);
}
