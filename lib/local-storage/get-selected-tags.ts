const DEFAULT_SELECTED_TAGS = ["英検"];

export function getSelectedTags() {
  const selectedTagsStr = localStorage.getItem("selectedTags");

  if (selectedTagsStr === null) {
    return DEFAULT_SELECTED_TAGS;
  }

  return selectedTagsStr ? selectedTagsStr.split(",") : [];
}
