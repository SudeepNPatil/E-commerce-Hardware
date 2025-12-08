import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ THIS MUST PRINT
console.log('✅ Cloudinary Config Loaded:', {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? '✅ OK' : '❌ Missing',
  secret: process.env.CLOUDINARY_API_SECRET ? '✅ OK' : '❌ Missing',
});

export default cloudinary;
