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
    case 'POST':
      try {
        const body = JSON.parse(req.body);

        const found = await Ad.find({
          title: { $regex: body.text },
          ...(body.category ? { category: body.category } : null),
        });

        res.status(200).json({ success: true, data: found });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e.message });
      }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });
      break;
  }
}
