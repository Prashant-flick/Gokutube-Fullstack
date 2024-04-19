import React from 'react'

function Button({
  label="button",
  type="submit",
  classname="",
  ...props
}) {
  return (
    <div>
      <button className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${classname}`}
        {...props}
      >
        {label}
      </button>
    </div>
  )
}

export default Button