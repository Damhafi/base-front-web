import { Product } from 'src/entities/product'
import { api } from 'src/services/api'

const getProductFunctions = (token: string) => {
    const createNewProduct = async (
        product: Product,
    ): Promise<Product | null> => {
        try {
            const result = await api.post(
                '/products',
                {
                    name: product.name,
                    description: product.name,
                    weight: product.weight,
                    quantity: product.quantity,
                    value: product.value,
                    enabled: product.enabled,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
            )

            if (result && result.status === 201) {
                return result.data
            } else {
                return null
            }
        } catch (e) {
            return null
        }
    }

    const changeProductEnabled = async (
        productId: number,
        enabled: boolean,
    ): Promise<boolean> => {
        try {
            const result = await api.patch(
                `/products/${productId}`,
                {
                    enabled: enabled,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
            )

            if (result && result.status === 201) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }

    return {
        createNewProduct,
        changeProductEnabled,
    }
}

export { getProductFunctions }
