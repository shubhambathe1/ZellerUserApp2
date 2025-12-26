import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

export const db = SQLite.openDatabase({
  name: "zeller.db",
  location: "default",
});
