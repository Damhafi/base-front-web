import { AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWR from 'swr'
import { Fetcher, PublicConfiguration } from 'swr/dist/types'

import { api } from 'src/services/api'

export class UseAxiosError extends Error {
    public status?: number
    public info?: string
}

export default function useAxios<Data = any, Error = UseAxiosError>(
    url: string,
    axiosConfig: AxiosRequestConfig = {},
    config: Partial<PublicConfiguration<Data, Error, Fetcher<Data>>> = {},
    condition = true,
) {
    const { data, error, mutate } = useSWR<Data, Error>(
        condition ? url : null,
        async fetchUrl => {
            try {
                const response = await api.get<unknown, AxiosResponse<Data>>(
                    fetchUrl,
                    axiosConfig,
                )

                return response.data
            } catch (e: any) {
                const errorObject = new UseAxiosError(
                    'An error occurred while fetching the data.',
                )

                errorObject.info = e.response.data.error || 'Unexpected error'
                errorObject.status = e.response.status

                throw errorObject
            }
        },
        config,
    )

    return { data, error, mutate }
}
