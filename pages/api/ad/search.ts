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
      const body = JSON.parse(req.body);

      console.log(body, 'body');

      const found = await Ad.find({
        title: { $regex: body.text },
        ...(body.category ? { category: body.category } : null),
      });

      console.log(found);

      //   try {
      //     const newAd = await Ad.updateOne({ _id: updateId }, { ...req.body });
      //     res.status(200).json({ success: true, data: newAd });
      //   } catch (e: any) {
      //     res.status(400).json({ success: false, message: e.message });
      //   }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });
      break;
  }
}
