import useSWR from 'swr'
import api from 'services/api'

export function useFetch<Data = any>(url: string) {

  const { data, error, mutate } = useSWR<Data>(url, async url => {
    const response = await api.get<Data>(url)
    return response.data
  })

  return { data, error, mutate }
}

export default useFetch