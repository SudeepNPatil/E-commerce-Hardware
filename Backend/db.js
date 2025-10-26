import mongoose from 'mongoose';

async function db() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);

    console.log('DB connected', connection.connection.host);
  } catch (err) {
    console.error('error in conneting db', err);
  }
}

export default db;
