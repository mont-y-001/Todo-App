import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white'>
        <div className="logo">
            <span className='font-bold text-xl m'>iTask</span>
        </div>
<ul className="flex">
    <li>Home</li>
    <li>Your Task</li>
    <li></li>
</ul>
    </nav>
  )
}

export default Navbar
