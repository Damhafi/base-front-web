import React, { useRef, useEffect } from 'react'
import ReactSelect, { Props as SelectProps } from 'react-select'

import { useField } from '@unform/core'

export type Option = {
    label: string
    value: any
    disabled?: boolean
}
interface Props extends SelectProps<Option> {
    name: string
    label?: string
    required?: boolean
}

const SelectComponent = ({ name, id, label, required, ...rest }: Props) => {
    const selectRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    const colourStyles = {
        control: (styles: any) => ({
            ...styles,
            height: '3rem',
        }),
        valueContainer: (styles: any) => ({
            ...styles,
            paddingLeft: '1rem',
        }),
        option: (styles: any) => {
            const newOptionStyles = {
                ...styles,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '1rem',
            }

            return newOptionStyles
        },
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: ref => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return []
                    }
                    return ref.state.value.map((option: Option) => option.value)
                }
                if (
                    !ref.state.selectValue ||
                    ref.state.selectValue[0] === undefined
                ) {
                    return ''
                }

                return ref.state.selectValue[0].value
            },
            setValue: (ref, value) => {
                ref.selectOption(value)
            },
            clearValue: ref => {
                ref.clearValue()
            },
        })
    }, [fieldName, registerField, rest.isMulti])

    return (
        <div>
            {label && (
                <label htmlFor={fieldName}>
                    {label}
                    {required && <span>(Obrigatório)</span>}
                </label>
            )}
            <ReactSelect
                defaultValue={defaultValue}
                ref={selectRef}
                classNamePrefix="react-select"
                instanceId={id}
                isOptionDisabled={option =>
                    option.disabled !== undefined && option.disabled
                }
                {...rest}
                styles={colourStyles}
            />
            {error && <span>{error}</span>}
        </div>
    )
}

export { SelectComponent }
