import { useSession } from 'next-auth/react'
import { NextRouter } from 'next/dist/client/router'
import { RiLoader4Fill } from 'react-icons/ri'

interface AuthProps {
    children: JSX.Element
    router: NextRouter
}

const AuthProvider = ({ children, router }: AuthProps) => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/auth/signin/')
        },
    })

    if (status === 'loading') {
        return (
            <div>
                <RiLoader4Fill />
                Loading session data...
            </div>
        )
    }

    return children
}

export { AuthProvider }
