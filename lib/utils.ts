import { ObjectId } from "mongodb";

// Validate ID
export function validateId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID.");
  }
  return new ObjectId(id);
}

// Format currency
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
