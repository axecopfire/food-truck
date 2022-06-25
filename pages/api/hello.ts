// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import process from "process";

type Data = {
  name: string;
  env: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Testing observability of vercel");
  console.log(process.env.MAPS_KEY);

  //dev.virtualearth.net/REST/v1/Locations/37.76201920035647,-122.42730642251331?key=Ap6OOiKnz5oerx3d-t7A8fxtgNLmoW6wlwx8w8wqheaIMyBnLUET1ybilKs7xToM
  http: res
    .status(200)
    .json({ name: "John Doe", env: process.env.MAPS_KEY ? "true" : "false" });
}
