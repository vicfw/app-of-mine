/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://master.d2emqtezw7d45.amplifyapp.com',
  },
};
