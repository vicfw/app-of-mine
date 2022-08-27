import { NextApiRequest, NextApiResponse } from "next";
import Ad from "../../../models/Ad";
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
        const total = await Ad.find({ isApproved: true }).count();
        const ad = await Ad.find({ isApproved: true })
          .limit(query?.limit ? +query.limit : 9999)
          .skip(query?.skip ? +query.skip : 0)
          .sort({ createdAt: -1 });

        res.status(201).json({ success: true, data: ad, total });
      } catch (e: any) {
        res.status(201).json({
          success: false,
          message: e.message,
          field: "",
        });
      }

      break;

    case "DELETE":
      const dd = await Ad.deleteMany({ _id: req.body });

      if (dd.acknowledged && dd.deletedCount > 0) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });

    default:
      res.status(400).json({ success: false, message: "something went wrong" });

      break;
  }
}
