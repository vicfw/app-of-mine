/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    NODE_ENV: 'development',
    MONGODB_URI:
      'mongodb+srv://farid:farid2560714@cluster0.axthw.mongodb.net/truck-app?retryWrites=true&w=majority',
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://master.d2emqtezw7d45.amplifyapp.com',
    NEXTAUTH_SECRET: 'asdasdasfdkjioqjgiojoi213123',
  },
};

//  env: {
//   MONGODB_URI:
//     'mongodb+srv://farid:farid2560714@cluster0.axthw.mongodb.net/truck-app?retryWrites=true&w=majority',
//   NEXTAUTH_URL: 'https://master.d2emqtezw7d45.amplifyapp.com',
//   NEXTAUTH_SECRET: 'asdasdasfdkjioqjgiojoi213123',
// },
