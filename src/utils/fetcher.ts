import axios, { AxiosRequestConfig } from 'axios'

export const fetcher = (config?: AxiosRequestConfig) => (url: string) =>
  axios(url, config).then((r) => r.data)
