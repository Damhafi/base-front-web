import Image from 'next/image'

import Logo from 'public/logo.svg'

const HeaderComponent = () => {
    return (
        <header>
            <Image src={Logo} width={173} height={40} />
        </header>
    )
}

export { HeaderComponent }
