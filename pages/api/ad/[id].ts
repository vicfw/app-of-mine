import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      const { id: updateId } = req.query as { id: string };

      try {
        const newAd = await Ad.updateOne({ id: updateId }, { ...req.body });
        res.status(200).json({ success: true, data: newAd });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e.message });
      }

      break;

    case 'DELETE':
      const { id: deleteId } = req.query as { id: string };

      console.log(deleteId);

      try {
        const deletedAd = await Ad.findByIdAndDelete(deleteId);

        if (!deletedAd) {
          return res
            .status(400)
            .json({ success: false, message: 'there is no such a ad' });
        }

        return res.status(200).json({ success: true });
      } catch (e: any) {
        return res.status(400).json({ success: false, message: e.message });
      }

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });
      break;
  }
}
