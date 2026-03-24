import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  bookings: many(booking),
}));

export const barberShop = pgTable("barber-shop", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phones: text("phones").array(),
  description: text("description"),
  imageUrl: text("image-url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const barberShopRelations = relations(barberShop, ({ many }) => ({
  barberShopServices: many(barberShopService),
}));

export const barberShopService = pgTable(
  "barber-shop-service",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    imageUrl: text("image-url"),
    price: numeric("price", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    barberShopId: uuid("barber_shop_id")
      .notNull()
      .references(() => barberShop.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("barber-shop-service_barberShopId_idx").on(table.barberShopId),
  ],
);

export const barberShopServiceRelations = relations(
  barberShopService,
  ({ many, one }) => ({
    bookings: many(booking),
    barberShop: one(barberShop, {
      fields: [barberShopService.barberShopId],
      references: [barberShop.id],
    }),
  }),
);

export const booking = pgTable(
  "booking",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    barberShopServiceId: uuid("barber_shop_service_id")
      .notNull()
      .references(() => barberShopService.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("booking_barberShopServiceId_idx").on(table.barberShopServiceId),
    index("booking_userId_idx").on(table.userId),
  ],
);

export const bookingRelations = relations(booking, ({ one }) => ({
  barberShopService: one(barberShopService, {
    fields: [booking.barberShopServiceId],
    references: [barberShopService.id],
  }),
  user: one(user, {
    fields: [booking.userId],
    references: [user.id],
  }),
}));
