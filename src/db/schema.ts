import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contactRequests = pgTable('contact_requests', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  business: text('business').notNull(),
  email: text('email').notNull(),
  service: text('service').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
