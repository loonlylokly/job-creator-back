import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("Pipedrive", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  userId: text("userId").notNull(),
  companyId: text("companyId").notNull(),
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken").notNull(),
});
