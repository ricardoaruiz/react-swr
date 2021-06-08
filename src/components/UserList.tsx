import React from 'react'
import { Link } from 'react-router-dom'

import useFetch from 'hooks/useFetch'

type User = {
  id: number
  name: string
}

export const UserList = () => {

  const { data } = useFetch<User[]>('http://localhost:3333/users')

  if (!data) {
    return <div>Carregando...</div>
  }

  return (
    <ul>
      {data.map(({id, name}) => (
        <li key={id}><Link to={`/${id}`}>{name}</Link></li>
      ))}
    </ul>
  )
}

export default UserList
