import React from 'react'
import { HeaderComponent } from './header'

interface BaseLayoutProps {
    children: React.ReactNode
}

const BaseLayoutComponent = ({ children }: BaseLayoutProps) => {
    return (
        <main>
            <HeaderComponent />
            {children}
        </main>
    )
}

export { BaseLayoutComponent }
