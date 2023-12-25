import {open} from 'react-native-quick-sqlite';

export const tableName = 'nearbyRestaurants';

export const getDBConnection = async () => {
  return open({name: 'demoApp.sqlite', location: 'default'});
};

export const createTable = async db => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_data varchar DEFAULT NULL
      );`;
    let {rows} = await db.execute(query);
    return true;
  } catch (e) {
    console.error('Something went wrong executing SQL commands:', e.message);
  }
};

export const getRecords = async (db, page) => {
  try {
    const listItems = [];
    const query = `SELECT * FROM ${tableName} limit ${page}, 10;`;
    let {rows} = await db.execute(query);
    if (rows?.length > 0) {
      for (let index = 0; index < rows.length; index++) {
        listItems.push(rows.item(index));
      }
    }
    return listItems;
  } catch (e) {
    console.error('Something went wrong executing SQL commands:', e.message);
  }
};

export const saveRecords = async (db, data) => {
  return await new Promise(async (res, rej) => {
    try {
      const query = `INSERT INTO ${tableName} ('id','restaurant_data') values (NULL, '${data}')`;
      let {rowsAffected} = await db.execute(query);
      if (rowsAffected > 0) {
        res(true);
      } else {
        rej(false);
      }
    } catch (e) {
      console.error('Something went wrong executing SQL commands:', e.message);
      rej(false);
    }
  });
};

export const totalRows = async(db) => {
  const query = `SELECT COUNT(*) as total FROM ${tableName};`;
  let rows = await db.execute(query);
  return rows?.rows.item(0)?.total;
}