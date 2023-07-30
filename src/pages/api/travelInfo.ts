// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Travel = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Travel[]>,
) {
    const travelList: Travel[] = [
        
    ]
  res.status(200).json(travelList)
}
