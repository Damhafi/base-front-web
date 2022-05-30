import { ILoginDTO } from 'src/dtos/login'
import { ValidateResult } from 'src/types/validate'

export async function validateLogin(data: ILoginDTO): Promise<ValidateResult> {
    const Yup = await import('yup')

    const validationErrors: Record<string, string> = {}

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Digite um email válido')
            .required('Digite um email'),
        password: Yup.string().required('Digite uma senha'),
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
