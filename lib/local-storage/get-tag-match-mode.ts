import { TagMatchMode } from "@/lib/types";

const DEFAULT_TAG_MATCH_MODE: TagMatchMode = "any";

export function getTagMatchMode(): TagMatchMode {
  return localStorage.getItem("tagMatchMode") === "all" ? "all" : DEFAULT_TAG_MATCH_MODE;
}
