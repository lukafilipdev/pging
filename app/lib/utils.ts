/** Two-digit index label: 0 → "01". */
export const indexLabel = (i: number) => String(i + 1).padStart(2, "0");

/** Stagger between items in a revealed list, in ms. */
export const STAGGER_MS = 110;
