import { MongooseError } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log('method:', method);

  switch (method) {
    case 'POST':
      try {
        console.log(req.body, 'body');

        const ad = await Ad.create(req.body);

        console.log(ad);

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
