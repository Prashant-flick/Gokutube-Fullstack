import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function UserAvatar({
  avatar=null,
  classname,
}) {

  return (
    <div>
      {
        avatar!=null ? 
          <img src={avatar} alt="User Avatar" 
            className={`border-2 border-gray-400 rounded-full h-12 w-12 object-cover cursor-pointer hover:opacity-80 transition duration-300 ease-in-out ${classname}`}
          />
        :
        <img src="temp/istockphoto-1337144146-612x612.jpg" alt="User Avatar" 
          className={`rounded-full h-12 w-12 object-cover cursor-pointer hover:opacity-60 transition duration-300 ease-in-out ${classname}`}
        />
      }
    </div>
  )
}

export default UserAvatar
