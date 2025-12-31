import { ZellerUserType } from "../components/UserList/types";
import { db } from "./database";

export const createUserTable = async () => {
  const database = await db;
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT,
      email TEXT,
      role TEXT
    );
  `);
};

export const addUser = async (user: ZellerUserType) => {
  const database = await db;

  await database.executeSql(
    `
    INSERT OR REPLACE INTO users (id, name, email, role)
    VALUES (?, ?, ?, ?);
    `,
    [user.id, user.name, user.email, user.role]
  );
};

export const insertUsers = async (users: ZellerUserType[]) => {
  const database = await db;

  await database.transaction(tx => {
    users.forEach(user => {
      tx.executeSql(
        `
        INSERT OR REPLACE INTO users (id, name, email, role)
        VALUES (?, ?, ?, ?);
        `,
        [user.id, user.name, user.email, user.role]
      );
    });
  });
};

export const getAllUsers = async (): Promise<ZellerUserType[]> => {
  const database = await db;

  const [result] = await database.executeSql(
    `SELECT * FROM users;`
  );

  const users: ZellerUserType[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    users.push(result.rows.item(i));
  }

  return users;
};

export const deleteUserById = async (userId: string) => {
  const database = await db;

  await database.executeSql(
    `DELETE FROM users WHERE id = ?;`,
    [userId]
  );
};
