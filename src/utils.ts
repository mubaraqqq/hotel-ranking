import { v4 } from "uuid";

export function generateUUID() {
  return v4();
}
export function initializeCheckedObject(
  arr: string[]
): Record<string, boolean> {
  let obj: Record<string, boolean> = {};
  for (let element of arr) {
    obj[element] = false;
  }

  return obj;
}

export function filterCheckedObjects(obj: Record<string, boolean>): string[] {
  let arr: string[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (value) arr.push(key);
  });
  return arr;
}
