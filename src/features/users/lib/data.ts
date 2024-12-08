import "server-only";

import { cache } from "react";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { User } from "@/features/users/lib/types";

export const getUserFromDb = cache(
  async (username: string, password: string): Promise<User | undefined> => {
    const result = db.query.users.findFirst({
      where: and(eq(users.username, username), eq(users.password, password)),
    });
    return result;
  }
);
