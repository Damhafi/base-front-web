import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'

import { ServerStyleSheet } from 'styled-components'

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="robots" content="noindex, nofollow" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1"
                    />

                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}

export default CustomDocument
