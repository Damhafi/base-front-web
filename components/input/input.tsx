import { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

interface Props {
    name: string
    label?: string
    showRequired?: boolean
}

type InputProps = JSX.IntrinsicElements['input'] & Props

const InputComponent = ({
    name,
    label,
    className,
    required,
    showRequired = true,
    ...rest
}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, registerField, error, defaultValue } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: ref => ref.value,
            setValue: (ref, newValue) => {
                ref.value = newValue
            },
            clearValue: ref => {
                ref.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <div>
            {label && (
                <label htmlFor={fieldName}>
                    {label}{' '}
                    {required && showRequired && <span>(Obrigatório)</span>}
                </label>
            )}
            <input
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                required={required}
                {...rest}
            />
            {error && <span>{error}</span>}
        </div>
    )
}

export { InputComponent }
