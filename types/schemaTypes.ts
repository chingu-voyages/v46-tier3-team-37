export type Image = {
  id: string;
  url: string;
}

export type Tool = {
  id: string;
  name: string;
  description: string;
  price: number;
  locationId: string;
  ownerId: string;
  image: Image[];
};

export function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}
