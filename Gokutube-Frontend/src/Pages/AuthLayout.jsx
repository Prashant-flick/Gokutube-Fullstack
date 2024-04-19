import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AuthLayout({children, authentication = true}) {
  const navigate = useNavigate()
  const authstatus = useSelector(state => state.authReducer.status)

  const [loader , setloader] = useState(true)

  useEffect(() => {
    if(authentication && authstatus !== authentication){
      navigate('/login')
    }else if(!authentication && authstatus !== authentication){
      navigate('/')
    }
    setloader(false)
  },[navigate, authstatus, authentication])

  return loader ? <h1>loading...</h1> : <>{children}</>
}

export default AuthLayout