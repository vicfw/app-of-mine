import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../models/Ad';
import dbConnect from '../../src/utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const justPopularAds = await Ad.find({ isPopular: true })
          .sort({ createdAt: -1 })
          .limit(3);

        res.status(200).json({ success: true, data: justPopularAds });
      } catch (e) {
        res
          .status(200)
          .json({ success: false, massage: 'something went wrong' });
      }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });

      break;
  }
}
