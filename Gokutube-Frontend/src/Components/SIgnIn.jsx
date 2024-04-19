import React from 'react'
import {
    Input,
    Button,
} from './index.js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function SIgnIn() { 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault()
    const {emailorusername, password} = e.target;

    try {
      axios.defaults.withCredentials = true;

      const data = await axios.post('/api/v1/users/login', {
          email: emailorusername.value,
          username: emailorusername.value,
          password: password.value
        }
      )

      
      dispatch(authLogin(data.data.data.user));
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }


  return (
      <div className='flex justify-center items-center w-full' style={{height: "90vh"}}>
          <div className='border-2 border-gray-800 rounded-lg flex flex-col gap-4 justify-center items-center w-1/4 bg-gray-500' style={{height: '60vh'}}>
            <h1 className='font-bold text-5xl'>SIGN IN</h1>
            <form className='flex flex-col items-center' style={{width: '100%'}}
              onSubmit={(e) => login(e)}
            >  
              <Input name="emailorusername" className='w-3/4' label="Email or Username" type="text" placeholder="Email or Username" />
              <Input name="password" className='w-3/4' label="Password" type="password" placeholder="Password" />
              <Button type='submit' label='login' classname='w-full'/>
            </form>
            <Link to='/signup' className='text-white hover:text-gray-700'>Don't have an account? Sign Up</Link>
          </div>
      </div>
  )
}

export default SIgnIn