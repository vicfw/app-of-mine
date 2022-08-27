import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../models/Category";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { query } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const total = await Category.estimatedDocumentCount();
        const category = await Category.find()
          .limit(query?.limit ? +query.limit : 9999)
          .skip(query?.skip ? +query.skip : 0)
          .sort({ createdAt: -1 });

        res.status(201).json({ success: true, data: category, total });
      } catch (e: any) {
        res.status(201).json({
          success: false,
          message: e.message,
          field: "",
        });
      }

      break;

    case "DELETE":
      const dd = await Category.deleteMany({ _id: req.body });

      if (dd.acknowledged && dd.deletedCount > 0) {
        res.status(200).json({ success: true });
      }
      res.status(400).json({ success: false });
      break;
    case "PATCH":
      const updated = await Category.updateMany(
        { _id: req.body },
        { isApproved: true } //this part need to be fixed
      );

      if (updated.acknowledged) {
        res.status(201).json({ success: true });
      } else {
        res.status(400).json({ success: false, data: null });
      }

      break;
    default:
      res.status(400).json({ success: false, message: "something went wrong" });

      break;
  }
}
