// sort but put names start with an underscore at the top
export const byUnderscoreTop = (a: string, b: string) => {
  if (a.startsWith("_") && !b.startsWith("_")) {
    return -1; // a (with _) comes first
  } else if (!a.startsWith("_") && b.startsWith("_")) {
    return 1; // b (with _) comes first
  }
  // For the rest, use default alphabetical sorting
  return a.localeCompare(b);
};
