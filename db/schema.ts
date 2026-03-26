import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, uuid, numeric } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(userTable, ({ many }) => ({
  bookings: many(bookingTable),
}));

export type User = typeof userTable.$inferSelect & { bookings: Booking[] };

export const barberShopTable = pgTable('barber-shop', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phones: text('phones').array(),
  description: text('description'),
  imageUrl: text('image-url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const barberShopRelations = relations(barberShopTable, ({ many }) => ({
  barberShopServices: many(barberShopServiceTable),
}));

export type BarberShop = typeof barberShopTable.$inferSelect & {
  barberShopServices: BarberShopService[];
};

export const barberShopServiceTable = pgTable(
  'barber-shop-service',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    imageUrl: text('image-url'),
    price: numeric('price', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    barberShopId: uuid('barber_shop_id')
      .notNull()
      .references(() => barberShopTable.id, { onDelete: 'cascade' }),
  },
  (table) => [index('barber-shop-service_barberShopId_idx').on(table.barberShopId)],
);

export const barberShopServiceRelations = relations(barberShopServiceTable, ({ many, one }) => ({
  bookings: many(bookingTable),
  barberShop: one(barberShopTable, {
    fields: [barberShopServiceTable.barberShopId],
    references: [barberShopTable.id],
  }),
}));

export type BarberShopService = typeof barberShopServiceTable.$inferSelect;

export const bookingTable = pgTable(
  'booking',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    date: timestamp('date').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    barberShopServiceId: uuid('barber_shop_service_id')
      .notNull()
      .references(() => barberShopServiceTable.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('booking_barberShopServiceId_idx').on(table.barberShopServiceId),
    index('booking_userId_idx').on(table.userId),
  ],
);

export const bookingRelations = relations(bookingTable, ({ one }) => ({
  barberShopService: one(barberShopServiceTable, {
    fields: [bookingTable.barberShopServiceId],
    references: [barberShopServiceTable.id],
  }),
  user: one(userTable, {
    fields: [bookingTable.userId],
    references: [userTable.id],
  }),
}));

export type Booking = typeof bookingTable.$inferSelect;
