import React, { useEffect, useState } from 'react'
import {Logo, SearchBar, UserAvatar} from './index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios  from '../api/axios.js'
import { useNavigate } from 'react-router-dom'

function Header() {
  const status = useSelector(state => state.authReducer.status)
  const user = useSelector(state => state.authReducer.userData)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggle = (e) => {
    e.preventDefault()
    setShow((prev)=>!prev)
  }

  const logout = async(e) => {
    e.preventDefault()
    const data = await axios.post('/api/v1/users/logout')
    if(data.status == 200){
      window.localStorage.clear()
      navigate('/')
      window.location.reload()
    }
  }

  return (
      <div className='z-50 flex flex-row bg-gray-950 fixed top-0 left-0 right-0 justify-between items-center px-7 border-b-2 border-gray-800'
        style={{height: '10vh'}}
      >
        <Link to='/'>
          <Logo classname="h-18"/>
        </Link>
        <SearchBar />
        <ul>
        {
          status ? 
          <li>
              <button className='h-full w-full' onClick={(e)=>toggle(e)}>
                <UserAvatar avatar={user?.avatar}/>
              </button>

              {
                show ?
                <div onClick={(e) => toggle(e)} className='fixed left-0 top-0 h-[100vh] w-[100vw]'>
                  <div onClick={(e) => e.stopPropagation()} className='rounded-lg top-16 right-2 mt-2 fixed flex flex-col justify-center items-center w-36 bg-gray-600'>
                    <button onClick={(e) => logout(e)} className='h-10 text-white font-medium border-b w-full border-gray-900'>
                      Sign Out
                    </button>
                    <button className='h-10 text-white border-b w-full font-medium border-gray-900'>
                      Switch Account
                    </button>
                    <button className='h-10 text-white font-medium w-full'>
                      Light Mode
                    </button>
                  </div>
                </div>
                :
                null
              }
              
              
          </li>
          :
          <li>
            <Link to='/login'>
              <UserAvatar avatar={user?.avatar}/>
            </Link>
          </li>
        }
        </ul>
      </div>
  )
}

export default Header