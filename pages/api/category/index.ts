import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import Category from '../../../models/Category';
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
        const categories = await Category.find({}).populate({
          path: 'ads',
          model: Ad,
          select: 'category',
        });
        res.status(200).json({ success: true, data: categories });
      } catch (e: any) {
        res.status(400).json({ success: false, error: e.message });
      }

      break;
    case 'POST':
      const parsedBody = JSON.parse(req.body);

      const finalData = Object.assign(parsedBody, {
        slug: parsedBody.name.trim().split(' ').join('_'),
      });

      try {
        if (!finalData.name) {
          return res
            .status(400)
            .json({ success: false, massage: "Category name can't be empty" });
        }
        if (!finalData.slug) {
          return res
            .status(400)
            .json({ success: false, massage: "Category name can't be empty" });
        }

        const category = await Category.create(finalData);

        res.status(201).json({ success: true, data: category });
      } catch (e: any) {
        res.status(201).json({ success: false, message: e.message });
      }

      break;

    default:
      res.status(400).json({ success: false, message: 'something went wrong' });

      break;
  }
}
