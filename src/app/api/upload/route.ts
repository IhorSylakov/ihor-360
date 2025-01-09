import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import stream from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = async (buffer: Buffer): Promise<string> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result?.secure_url || '');
            }
          }
        );

        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);

        bufferStream.pipe(uploadStream);
      });
    };

    const url = await upload(buffer);

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
};
