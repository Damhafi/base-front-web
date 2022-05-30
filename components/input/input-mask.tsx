import { useRef, useEffect } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'

import { useField } from '@unform/core'

interface InputMaskProps extends InputProps {
    name: string
    label?: string
}

const InputMaskComponent = ({ name, label, ...rest }: InputMaskProps) => {
    const inputRef = useRef(null)
    const { fieldName, registerField, defaultValue, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref, newValue: string) {
                ref.value = newValue
            },
            clearValue(ref) {
                ref.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <div>
            {label && <label htmlFor={fieldName}>{label}</label>}
            <ReactInputMask
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <span>{error}</span>}
        </div>
    )
}

export { InputMaskComponent }
