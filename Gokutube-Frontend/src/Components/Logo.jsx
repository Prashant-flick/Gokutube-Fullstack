import React from 'react'

function Logo({
    classname
}) {
  return (
    <div>
        <img src="https://res.cloudinary.com/dbmlz6pip/image/upload/v1712023591/dkctjfekmwpvy1mpndoa.png" alt="Logo" className={`${classname} h-14 object-cover object-center rounded-full cursor-pointer hover:opacity-60 transition duration-300 ease-in-out`}
        />
    </div>
  )
}

export default Logo