import type { RevenuePoint } from "@/types";

export const dailyRevenue: RevenuePoint[] = [
  { label: "9 AM", revenue: 1240, orders: 14 },
  { label: "10 AM", revenue: 1880, orders: 21 },
  { label: "11 AM", revenue: 2450, orders: 27 },
  { label: "12 PM", revenue: 4320, orders: 48 },
  { label: "1 PM", revenue: 5180, orders: 56 },
  { label: "2 PM", revenue: 3210, orders: 34 },
  { label: "3 PM", revenue: 1640, orders: 18 },
  { label: "4 PM", revenue: 2050, orders: 22 },
  { label: "5 PM", revenue: 2780, orders: 29 },
  { label: "6 PM", revenue: 1920, orders: 20 },
];

export const weeklyRevenue: RevenuePoint[] = [
  { label: "Mon", revenue: 18420, orders: 198 },
  { label: "Tue", revenue: 21340, orders: 224 },
  { label: "Wed", revenue: 19880, orders: 212 },
  { label: "Thu", revenue: 23110, orders: 241 },
  { label: "Fri", revenue: 27560, orders: 287 },
  { label: "Sat", revenue: 14220, orders: 155 },
  { label: "Sun", revenue: 9870, orders: 102 },
];

// Static deterministic monthly data (no random generation).
const monthlyValues: ReadonlyArray<readonly [number, number]> = [
  [15200, 162], [17400, 178], [19850, 205], [21100, 218], [16800, 174],
  [14500, 152], [13200, 138], [15900, 165], [18600, 192], [20400, 211],
  [22150, 229], [19700, 204], [17850, 184], [16200, 168], [14800, 154],
  [15600, 161], [17900, 185], [20100, 208], [22800, 235], [24600, 252],
  [21500, 222], [18900, 196], [16400, 170], [14700, 153], [15300, 159],
  [17200, 178], [19500, 201], [22100, 228], [23800, 244], [20700, 214],
];

export const monthlyRevenue: RevenuePoint[] = monthlyValues.map(([revenue, orders], i) => ({
  label: `${i + 1}`,
  revenue,
  orders,
}));
