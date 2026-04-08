import { ObjectId } from "mongodb";

// Validate ID
export function validateId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID.");
  }
  return new ObjectId(id);
}
