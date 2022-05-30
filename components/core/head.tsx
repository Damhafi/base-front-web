import Head from 'next/head'

interface HeadProps {
    title: string
}

const HeadComponent = ({ title }: HeadProps) => {
    const appName = process.env.NEXT_PUBLIC_APP_NAME

    return (
        <Head>
            <title>
                {title} | {appName}
            </title>
        </Head>
    )
}

export { HeadComponent }
