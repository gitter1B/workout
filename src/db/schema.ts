import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();

const updatedAt = timestamp("updated_at")
  .notNull()
  .$onUpdate(() => new Date());

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  calories: numeric("calories").notNull(),
});

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  mets: numeric("mets").notNull(),
});

export const mealLogs = pgTable("meal_logs", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  mealId: integer("meal_id")
    .notNull()
    .references(() => meals.id),
  createdAt,
  updatedAt,
});

export const workoutLogs = pgTable("workout_logs", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id),
  count: integer("count").notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(users, ({ many }) => ({
  mealLogs: many(mealLogs),
  workoutLogs: many(workoutLogs),
}));

export const workoutsRelations = relations(workouts, ({ many }) => ({
  mealLogs: many(mealLogs),
  workoutLogs: many(workoutLogs),
}));

export const mealLogsRelations = relations(mealLogs, ({ one }) => ({
  user: one(users, {
    fields: [mealLogs.userId],
    references: [users.id],
  }),
  meal: one(meals, {
    fields: [mealLogs.mealId],
    references: [meals.id],
  }),
}));

export const workoutLogsRelations = relations(workoutLogs, ({ one }) => ({
  user: one(users, {
    fields: [workoutLogs.userId],
    references: [users.id],
  }),
  workout: one(workouts, {
    fields: [workoutLogs.workoutId],
    references: [workouts.id],
  }),
}));
