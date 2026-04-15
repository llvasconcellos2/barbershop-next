import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  index,
  uuid,
  numeric,
  boolean,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// TODO: remove comment
// export const users = pgTable('user', {
//   id: text('id')
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text('name'),
//   email: text('email').unique(),
//   emailVerified: timestamp('emailVerified', { mode: 'date' }),
//   image: text('image'),
// });

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export type User = typeof users.$inferSelect;
export type UserWithBookings = User & { bookings: Booking[] };

export const barberShops = pgTable('barber-shop', {
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

export const barberShopRelations = relations(barberShops, ({ many }) => ({
  barberShopServices: many(barberShopServices),
}));

export type BarberShop = typeof barberShops.$inferSelect;
export type BarberShopWithServices = BarberShop & {
  barberShopServices: BarberShopService[];
};

export const barberShopServices = pgTable(
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
      .references(() => barberShops.id, { onDelete: 'cascade' }),
  },
  (table) => [index('barber-shop-service_barberShopId_idx').on(table.barberShopId)],
);

export const barberShopServiceRelations = relations(barberShopServices, ({ many, one }) => ({
  bookings: many(bookings),
  barberShop: one(barberShops, {
    fields: [barberShopServices.barberShopId],
    references: [barberShops.id],
  }),
}));

export type BarberShopService = typeof barberShopServices.$inferSelect;
export type BarberShopServiceWithBarberShop = BarberShopService & { barberShop: BarberShop };

export const bookings = pgTable(
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
      .references(() => barberShopServices.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('booking_barberShopServiceId_idx').on(table.barberShopServiceId),
    index('booking_userId_idx').on(table.userId),
  ],
);

export const bookingRelations = relations(bookings, ({ one }) => ({
  barberShopService: one(barberShopServices, {
    fields: [bookings.barberShopServiceId],
    references: [barberShopServices.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

export type Booking = typeof bookings.$inferSelect;
export type BookingWithService = Booking & { barberShopService: BarberShopService };
export type BookingWithServiceAndBarberShop = Booking & {
  barberShopService: BarberShopServiceWithBarberShop;
};

export type AdapterAccountType = 'oauth' | 'oidc' | 'email' | 'webauthn';

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);
