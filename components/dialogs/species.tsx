import { Dialog } from '@headlessui/react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { SelectComponent } from 'components/input/select'
import React, {
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { Specie } from 'src/entities/specie'

interface NewSpeciesDialogHandles {
    showModal: () => void
}

interface NewSpeciesDialogProps {
    onSelectNewSpecie(specie: Specie): void
    defaultSpecies: Specie[]
}
interface FormData {
    specie: number
}

const NewSpeciesDialog = React.forwardRef<
    NewSpeciesDialogHandles,
    NewSpeciesDialogProps
>(({ onSelectNewSpecie, defaultSpecies }, ref) => {
    const formRef = useRef<FormHandles>(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = useCallback(
        ({ specie }: FormData) => {
            formRef.current?.setErrors({})

            if (typeof specie !== 'number')
                return formRef.current?.setFieldError(
                    'specie',
                    'Selecione uma espécie válida',
                )

            const selectedSpecie = defaultSpecies.find(
                defaultSpecie => defaultSpecie.id === specie,
            )

            if (selectedSpecie) {
                onSelectNewSpecie(selectedSpecie)
            }

            setIsOpen(false)
        },
        [defaultSpecies, onSelectNewSpecie],
    )

    const showModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    useImperativeHandle(ref, () => {
        return {
            showModal,
        }
    })

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />

                <div className="relative bg-white rounded-md w-[700px] mx-auto px-10 py-9 flex flex-col">
                    <Dialog.Title className="font-ubuntu font-bold text-3xl mb-6">
                        Adicionar uma nova espécie
                    </Dialog.Title>
                    <Dialog.Description className="font-semibold text-lg mb-6">
                        Selecione abaixo uma espécie de animal
                    </Dialog.Description>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <SelectComponent
                            name="specie"
                            placeholder="Selecionar"
                            options={defaultSpecies.map(specie => ({
                                label: specie.name,
                                value: specie.id,
                                disabled: !specie.enabled,
                            }))}
                            required
                        />
                        <button
                            type="submit"
                            className="button button-solid w-56 mt-6"
                        >
                            Adicionar espécie
                        </button>
                    </Form>
                </div>
            </div>
        </Dialog>
    )
})

export { NewSpeciesDialog }
export type { NewSpeciesDialogHandles }
