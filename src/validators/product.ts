import { IProductDTO } from 'src/dtos/product'
import { ValidateResult } from 'src/types/validate'

export async function validateProduct(
    data: IProductDTO,
): Promise<ValidateResult> {
    const Yup = await import('yup')

    const validationErrors: Record<string, string> = {}

    if (typeof data.promotionalValue !== 'number') delete data.promotionalValue

    const schema = Yup.object().shape({
        id: Yup.number().notRequired(),
        name: Yup.string().required('Digite um nome válido'),
        description: Yup.string().required('Digite uma descrição válida'),
        weight: Yup.string().required('Digite um peso mínimo'),
        stock: Yup.number().required('Digite um valor mínimo'),
        value: Yup.number().required('Digite um preço mínimo'),
        promotionalValue: Yup.number().notRequired(),
        specie: Yup.number().required('Selecione uma espécie válida'),
        category: Yup.number().required('Selecione uma espécie válida'),
    })

    try {
        await schema.validate(data, {
            abortEarly: false,
        })

        return { ok: true, fields: {} }
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
                if (error && error.path) {
                    validationErrors[error.path] = error.message
                }
            })

            return { ok: false, fields: validationErrors }
        }

        return { ok: false, fields: {} }
    }
}
