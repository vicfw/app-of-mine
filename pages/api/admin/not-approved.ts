import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../src/utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log(req.query, 'query');

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const ad = await Ad.find({ isApproved: false });

        res.status(201).json({ success: true, data: ad });
      } catch (e: any) {
        res.status(201).json({
          success: false,
          message: e.message,
          field: e.errors?.title?.path,
        });
      }

      break;

    case 'PATCH':
      const updated = await Ad.updateMany(
        { _id: req.body },
        { isApproved: true }
      );

      if (updated.acknowledged) {
        res.status(201).json({ success: true });
      } else {
        res.status(400).json({ success: false, data: null });
      }

      break;
    case 'DELETE':
      const dd = await Ad.deleteMany({ _id: req.body });

      if (dd.acknowledged) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });

      break;
  }
}
