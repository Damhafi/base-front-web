import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { BaseLayoutComponent } from 'components/layout/base'
import { AppLayoutProps } from 'next/app'
import { ToastProvider } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from 'components/providers/auth'
import { GlobalStyle } from 'styles/global'
import { theme } from 'styles/global/theme'

export default function Petmall({
    Component,
    pageProps: { session, ...pageProps },
}: AppLayoutProps) {
    const router = useRouter()
    const { config } = Component

    return (
        <SessionProvider session={session}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                {config?.noLayout ? (
                    <ToastProvider autoDismiss={true}>
                        {router.pathname.startsWith('/dashboard') ? (
                            <AuthProvider router={router}>
                                <Component {...pageProps} />
                            </AuthProvider>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </ToastProvider>
                ) : (
                    <ToastProvider autoDismiss={true}>
                        {router.pathname.startsWith('/dashboard') ? (
                            <AuthProvider router={router}>
                                <BaseLayoutComponent>
                                    <Component {...pageProps} />
                                </BaseLayoutComponent>
                            </AuthProvider>
                        ) : (
                            <BaseLayoutComponent>
                                <Component {...pageProps} />
                            </BaseLayoutComponent>
                        )}
                    </ToastProvider>
                )}
            </ThemeProvider>
        </SessionProvider>
    )
}
