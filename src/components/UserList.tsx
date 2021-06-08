import React from 'react'
import { Link } from 'react-router-dom'

type User = {
  id: number
  name: string
}

export const UserList = () => {

  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch('http://localhost:3333/users');
      const data = await response.json()

      setUsers(data)
    }
    loadUsers()
  }, [])

  return (
    <ul>
      {users.map(({id, name}) => (
        <li key={id}><Link to={`/${id}`}>{name}</Link></li>
      ))}
    </ul>
  )
}

export default UserList
