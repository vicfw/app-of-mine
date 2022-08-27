import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../src/utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
      } catch (e) {}

      break;
    case 'POST':
      try {
        const ad = await Ad.create(req.body);

        res.status(201).json({ success: true, data: ad });
      } catch (e: any) {
        res.status(201).json({
          success: false,
          message: e.message,
          field: e.errors?.title?.path,
        });
      }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });

      break;
  }
}
