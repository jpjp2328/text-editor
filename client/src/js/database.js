import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create connection to DB and version
  const jateDb = await openDB('jate', 1);
  // Create transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open object store
  const store = tx.objectStore('jate');
  // Put method
  const request = store.put({ jate: content });
  // confirmation of req
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create connection to DB and version
  const jateDb = await openDB('jate', 1);
  // Create new transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // Open desired object store
  const store = tx.objectStore('jate');
  // .getAll() method, to get data
  const request = store.getAll();
  // confirmation of request
  const result = await request;
  console.log('results.value', result);
  return result;
};


initdb();
