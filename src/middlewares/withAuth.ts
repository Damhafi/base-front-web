import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const withAuthMiddleware =
    (handler: Function) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession({ req })

        if (session) {
            return handler(req, res, session)
        } else {
            return res.status(401).json({ error: 'Unauthorized request' })
        }
    }

export default withAuthMiddleware
