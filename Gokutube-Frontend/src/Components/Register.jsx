import React from 'react'
import axios from '../api/axios.js'
import {login as authLogin} from '../store/authSlice'
import {
  Input,
  Button,

} from './index.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const value = async(e) => {
    e.preventDefault();
    console.log(e.target.fullname.value);
    const { fullname, email, password, username } = e.target;
    // const form = new FormData(); 

    // //appending other data
    // form.append('fullName', fullname.value);
    // form.append('email', email.value);
    // form.append('username', username.value);
    // form.append('password', password.value);

    // console.log(form);

    try {
      const data = await axios.post('/api/v1/users/register',{
          fullName: fullname.value,
          email: email.value,
          username: username.value,
          password: password.value
        }
      )
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
    
  }


  return (
    <>
        <div className='flex justify-center items-center w-full h-[90vh]'>
            <div className='border-2 border-gray-800 rounded-lg flex flex-col gap-2 justify-center items-center w-1/3 bg-gray-500' style={{height: '70vh'}}>
              <h1 className='font-bold text-5xl'>SIGN UP</h1>
              <form className='flex flex-col items-center' style={{width: '100%'}}
                onSubmit={(e) => value(e)}
              >  
                <Input name="fullname" className='w-2/3' label="Full Name" type="text" placeholder="Full Name" />
                <Input name="email" className='w-2/3' label="Email" type="email" placeholder="Email" />
                <Input name="username" className='w-2/3' label="Username" type="text" placeholder="Username" />
                <Input name="password" className='w-2/3' label="Password" type="password" placeholder="Password" />
                <Button type='submit' label='SignUp' classname='w-full'/>
              </form>
              <Link to='/login' className='text-white hover:text-gray-700'>Already have an account? Sign In</Link>
            </div>
        </div>
    </>
  )
}

export default Register