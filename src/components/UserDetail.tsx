import React from 'react'
import { useParams } from 'react-router-dom'

type User = {
  id: number
  name: string
}

type Params = {
  id: string
}

export const UserDetail = () => {
  const { id } = useParams<Params>()
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    const loadUser = async () => {
      const response = await fetch(`http://localhost:3333/users/${id}`)
      const data = await response.json()

      setUser(data)
    }
    loadUser()
  }, [id])

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
