import { openDB } from 'idb';

const initdb = async () => openDB('jate', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('jate')) {
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    } else {
      console.log('jate database already exists');
    }
  },
})

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  const result = await store.put({ id: 1, value: content });
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const result = await store.getAll();
  console.log('result.value', result);
  return result?.value;
};

initdb();
