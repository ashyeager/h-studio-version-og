import { db } from './index.js';
import { contactRequests } from './schema.js';

export async function createContactRequest(data: { name: string, business: string, email: string, service: string, message: string }) {
  const result = await db.insert(contactRequests).values(data).returning();
  return result[0];
}
