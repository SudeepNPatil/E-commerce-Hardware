import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = (fileBuffer, folderName = 'image') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary Upload Error:', error);
          return reject(error);
        }

        console.log('✅ Cloudinary Upload Success');
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};
