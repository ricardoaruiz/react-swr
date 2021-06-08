import React from 'react'
import { Link } from 'react-router-dom'
import { mutate as mutateGlobal } from 'swr'

import useFetch from 'hooks/useFetch'
import api from 'services/api'

type User = {
  id: number
  name: string
}

export const UserList = () => {
  const { data: users, mutate } = useFetch<User[]>('users')

  const handleChangeName = React.useCallback((user: User) => {
    api.put(`users/${user.id}`, { name: 'Teobaldo' })

    const newUserList = users?.map(currentUser => {
      if(user.id === currentUser.id) {
        return { ...currentUser, name: 'Teobaldo' }
      }
      return currentUser
    })

    // Faz a mudança do cache local
    mutate(newUserList)

    // Faz a mudança do cache global para todas as requisiçãoes com a url informada
    mutateGlobal(`users/${user.id}`)
  }, [mutate, users])

  if (!users) {
    return <div>Carregando...</div>
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/${user.id}`}>{user.name}</Link>
          <button type="button" onClick={() => handleChangeName(user)}>Altera nome</button>
        </li>
      ))}
    </ul>
  )
}

export default UserList
