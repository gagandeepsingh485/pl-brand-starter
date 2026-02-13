import { Publive } from "publive-cms-sdk";

export const publive = new Publive({
  environment: process.env.NEXT_PUBLIC_PL_ENVIRONMENT as any,
  publisherId: Number(process.env.NEXT_PUBLIC_PL_PUBLISHER_ID),
  apiKey: process.env.NEXT_PUBLIC_PL_PUBLISHER_API_KEY as string,
  apiSecret: process.env.NEXT_PUBLIC_PL_PUBLISHER_API_SECRET as string
})

export const publiveBlog = new Publive({
  environment: process.env.NEXT_PUBLIC_PL_ENVIRONMENT as any,
  publisherId: Number(process.env.NEXT_PUBLIC_PL_PUBLISHER_ID),
  apiKey: process.env.NEXT_PUBLIC_PL_PUBLISHER_BLOG_API_KEY as string,
  apiSecret: process.env.NEXT_PUBLIC_PL_PUBLISHER_BLOG_API_SECRET as string
})