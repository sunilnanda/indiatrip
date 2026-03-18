export const INR_TO_AUD = 1 / 65;

export function parseCostRange(costTotal: string): [number, number] {
  const stripped = costTotal.replace(/\([^)]*\)/g, "").replace(/₹/g, "");
  const nums = stripped.match(/[\d,]+/g);
  if (!nums) return [0, 0];
  const values = nums.map((n) => parseFloat(n.replace(/,/g, "")));
  if (values.length >= 2) return [values[0], values[1]];
  return [values[0] || 0, values[0] || 0];
}

export const costLegs: { legId: string; label: string; category: "core" | "flexible"; fixedIndex?: number }[] = [
  { legId: "day1-vrindavan", label: "Delhi → Vrindavan", category: "core" },
  { legId: "day2", label: "Vrindavan Homestay", category: "core" },
  { legId: "day3", label: "Vrindavan → Sri Anandpur Dham", category: "core" },
  { legId: "day8", label: "Dham → Gwalior Airport Taxi", category: "core", fixedIndex: 0 },
  { legId: "day8", label: "Gwalior → Delhi Flight", category: "core", fixedIndex: 1 },
  { legId: "day9-delhi-jalandhar", label: "Delhi → Jalandhar", category: "core" },
  { legId: "day3", label: "Parul's Parents: Mathura → Chandigarh", category: "core", fixedIndex: 1 },
  { legId: "himachal", label: "Himachal Temple Circuit", category: "flexible" },
  { legId: "himachal", label: "Himachal Stay", category: "flexible", fixedIndex: 1 },
  { legId: "chandigarh", label: "Jalandhar → Chandigarh", category: "flexible" },
];
