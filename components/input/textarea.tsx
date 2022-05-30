import { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

interface Props {
    name: string
    label?: string
}

type TextareaProps = JSX.IntrinsicElements['textarea'] & Props

const TextareaComponent = ({
    name,
    label,
    rows = 5,
    className,
    cols,
    required,
    ...rest
}: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const {
        fieldName,
        defaultValue = '',
        registerField,
        error,
    } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textareaRef,
            getValue: ref => ref.current.value,
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <div>
            {label && (
                <label htmlFor={fieldName}>
                    {label}
                    {required && <span>(Obrigatório)</span>}
                </label>
            )}
            <textarea
                ref={textareaRef}
                id={fieldName}
                defaultValue={defaultValue}
                rows={rows}
                cols={cols}
                required={required}
                {...rest}
            />
            {error && <span>{error}</span>}
        </div>
    )
}

export { TextareaComponent }
