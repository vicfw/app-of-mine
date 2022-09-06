import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../src/utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const body = JSON.parse(req.body);

        const total = await Ad.find({
          title: { $regex: body.text.toLowerCase() },
          ...(body.category ? { category: body.category } : null),
        }).count();

        const found = await Ad.find({
          title: { $regex: body.text.toLowerCase() },
          ...(body.category ? { category: body.category } : null),
        })
          .limit(query?.limit ? +query.limit : 9999)
          .skip(query?.skip ? +query.skip : 0)
          .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: found, total });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e.message });
      }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });
      break;
  }
}
