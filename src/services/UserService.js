import { eq } from "drizzle-orm";
import axios from "axios";
import { db } from "../db/db.js";
import { usersTable } from "../db/schema.js";

class UserService {
  async addUser(accessToken, refreshToken) {
    const userInfo = await axios.get("https://api.pipedrive.com/v1/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: "json",
    });

    const newUser = {
      userId: String(userInfo.data.data.id),
      companyId: String(userInfo.data.data.company_id),
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return newUser;
  }

  async getAll() {
    const allUsers = await db.select().from(usersTable).all();
    return allUsers;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("set id");
    }
    const user = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getRefreshToken(id) {
    if (!id) {
      throw new Error("set id");
    }
    const user = await db.select().from(users).where(eq(users.id, id));
    return user.refreshToken;
  }

  async update(user) {
    if (!user.id) {
      throw new Error("set id");
    }
    const updatedUser = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning();
    return updatedUser;
  }

  async delete(id) {
    if (!id) {
      throw new Error("set id");
    }
    const user = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  }
}

export default new UserService();
