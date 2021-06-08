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
    mutate(users => {
      const newName = user.name.includes('Updated') ? user.name.split(' ')[0] : `${user.name} Updated`
      // Chama a api para alteração e continua o fluxo sem esperar
      api.put(`users/${user.id}`, { name: newName })

      // Retorna uma nova lista de usuários assumindo que não haverá erro na API
      return users?.map(currentUser => {
        if(user.id === currentUser.id) {
          // Faz a mudança do cache global para todas as requisiçãoes com a url informada passando o item alterado
          mutateGlobal(`users/${user.id}`, { id: user.id, name: newName })
          // Retorna o user alterado com o novo nome
          return { ...currentUser, name: newName }
        }

        // Atualiza o cache para a requisição corrente (a que listou ou users (linha 14))
        return currentUser
      })
    })
  }, [mutate])

  if (!users) {
    return <div>Carregando...</div>
  }

  return (
    <ul style={{ borderBottom: '1px solid gray', width: '200px', margin: '25px auto', paddingBottom: '20px' }}>
      {users.map((user) => (
        <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }} key={user.id}>
          <Link to={`/${user.id}`}>{user.name}</Link>
          <button type="button" onClick={() => handleChangeName(user)}>Change name</button>
        </li>
      ))}
    </ul>
  )
}

export default UserList
