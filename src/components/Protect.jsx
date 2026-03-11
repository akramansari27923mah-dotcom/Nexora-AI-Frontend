/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { api } from '../features/api/axios'
import { Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { AuthCon } from '../features/AuthContext'

const Protect = () => {
  const { setUser, user } = AuthCon()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/get-user')
        setUser(res.data?.user || null)
      } catch (err) {
        console.log('user fetch failed', err)
        setUser(null)
      }
      finally {
        setLoader(false)
      }
    }

    fetchUser()
  }, [user])


  if (loader) {
    return <div className='flex justify-center items-center h-screen'>
      <Loader size={50} className='animate-spin' />
    </div>
  }

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default Protect