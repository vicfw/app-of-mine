import { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../models/Category';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log('method:', method);

  switch (method) {
    case 'POST':
      try {
        if (!req.body.name) {
          return res
            .status(400)
            .json({ success: false, massage: "Category name can't be empty" });
        }
        if (!req.body.slug) {
          return res
            .status(400)
            .json({ success: false, massage: "Category name can't be empty" });
        }

        const category = await Category.create(req.body);

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
