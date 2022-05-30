import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { InputComponent } from 'components/input/input'
import { useRef, useState } from 'react'
import Image from 'next/image'

import { validateLogin } from 'src/validators/login'
import { signIn } from 'next-auth/react'
import { NextCustomPage } from 'next'
import { HeadComponent } from 'components/core/head'

import Logo from 'public/logo.svg'
import { RiLoader4Fill } from 'react-icons/ri'

interface FormData {
    email: string
    password: string
}

const Login: NextCustomPage = () => {
    const formRef = useRef<FormHandles>(null)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (data: FormData) => {
        formRef.current?.setErrors({})

        const validLogin = await validateLogin(data)

        if (validLogin.ok) {
            setLoading(true)

            const response = await signIn<'credentials'>('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (response && response.ok) {
                setLoading(false)
            } else {
                setLoading(false)
                formRef.current?.setFieldError(
                    'email',
                    'Email e/ou senha incorretos',
                )
            }
        } else {
            formRef.current?.setErrors(validLogin.fields)
        }
    }

    return (
        <article>
            <HeadComponent title="Login" />
            <header>
                <Image
                    quality={100}
                    src={Logo}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center center"
                />
            </header>
            <div>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <InputComponent
                        name="email"
                        type="email"
                        placeholder="Email"
                        label="Endereço de email:"
                        showRequired={false}
                        required
                    />
                    <InputComponent
                        name="password"
                        type="password"
                        placeholder="Senha"
                        label="Senha:"
                        showRequired={false}
                        required
                    />
                    <button
                        type="submit"
                        title="Entrar"
                        aria-label="Entrar"
                        disabled={loading}
                    >
                        {loading ? <RiLoader4Fill /> : 'Entrar'}
                    </button>
                </Form>
            </div>
        </article>
    )
}

Login.config = {
    noLayout: true,
}

export default Login
