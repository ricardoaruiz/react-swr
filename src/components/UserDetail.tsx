import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from 'hooks/useFetch'

type User = {
  id: number
  name: string
}

type Params = {
  id: string
}

export const UserDetail = () => {
  const { id } = useParams<Params>()
  
  const { data: user } = useFetch<User>(`users/${id}`)

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <>
    <div>
      id: {user?.id}
    </div>
    <div>
      Name: {user?.name}
    </div>
    </>
  )
}

export default UserDetail
