/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    MONGODB_URI:
      'mongodb+srv://farid:farid2560714@cluster0.axthw.mongodb.net/truck-app?retryWrites=true&w=majority',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'asdasdasfdkjioqjgiojoi213123',
  },
};
