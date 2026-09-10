import React from 'react'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { className?: string; variant?: 'primary'|'ghost'|'dark' }
export default function Button({children,className='',variant='primary',...props}:Props){
  const base = "px-6 py-2.5 rounded-full text-sm font-bold transition duration-200 inline-flex items-center justify-center"
  const variants = {
    primary: "bg-nilo text-white hover:bg-nilo-dark shadow-soft",
    ghost: "bg-white text-nilo ring-1 ring-nilo/20 hover:bg-nilo-muted",
    dark: "bg-negro text-white hover:bg-black"
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}
