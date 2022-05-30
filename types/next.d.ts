/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextComponentType, NextPageContext, NextCustomPage } from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
    type NextCustomPage<P = {}> = NextComponentType<NextPageContext, any, P> & {
        config?: {
            noLayout?: boolean
        }
    }
}

declare module 'next/app' {
    type AppLayoutProps<P = {}> = AppProps & {
        Component: NextCustomPage
    }
}
