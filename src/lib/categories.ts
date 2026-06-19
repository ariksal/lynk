const CATEGORY_LABELS: Record<string, string> = {
  hobby: "Hobby & interests",
  volunteering: "Volunteering",
  support: "Support",
  local: "Local & social",
  identity: "Identity",
};

export function categoryLabel(category: string) {
  return CATEGORY_LABELS[category] ?? category;
}
