const DEFAULT_SELECTED_LEVELS = ["1", "2", "3", "4", "5"];

export function getSelectedLevels() {
  const selectedLevelsStr = localStorage.getItem("selectedLevels");

  if (selectedLevelsStr === null) {
    return DEFAULT_SELECTED_LEVELS;
  }

  return selectedLevelsStr ? selectedLevelsStr.split(",") : [];
}
