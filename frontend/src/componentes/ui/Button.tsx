import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({children,className='',...props}:Props) {
  return (
      <button 
      className = {`px-5 py-2 rounded-lg text-xl font-bold transition duration-500 ${className}`}
    {...props}>
      {children}
    </button>
  )
}