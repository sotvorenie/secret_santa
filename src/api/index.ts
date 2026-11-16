import axios, {AxiosRequestConfig} from 'axios'

import {BASE_URL} from "@api/url.ts";

const client = axios.create({baseURL: BASE_URL})

export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await client.get(url, config)
    return res.data as T
}

export const apiPatch = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const res = await client.patch(url, data, config)
    return res.data as T
}