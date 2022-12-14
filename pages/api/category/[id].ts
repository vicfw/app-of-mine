import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import Category from "../../../models/Category";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "PATCH":
      const { id: updateId } = req.query as { id: string };

      const parsedBody = JSON.parse(req.body);

      parsedBody.slug = parsedBody.name.trim().split(" ").join("_");

      try {
        const newAd = await Category.findByIdAndUpdate(
          { _id: updateId },
          parsedBody
        );
        res.status(200).json({ success: true, data: newAd });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e.message });
      }

      break;

    case "DELETE":
      const { id: deleteId } = req.query as { id: string };

      try {
        const deletedCategory = await Category.deleteOne({ deleteId });
        if (!deletedCategory) {
          return res
            .status(400)
            .json({ success: false, message: "there is no such a category" });
        }

        return res.status(200).json({ success: true });
      } catch (e: any) {
        return res.status(400).json({ success: false, message: e.message });
      }

    default:
      res.status(400).json({ success: false, message: "something went wrong" });
      break;
  }
}
