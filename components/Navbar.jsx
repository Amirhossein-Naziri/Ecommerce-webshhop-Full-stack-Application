import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from "react-icons/ai";
import Card from "./Card";
import { useStateContext } from '../context/stateContext';




const Navbar = () => {
  const {showCart , setShowCart , totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
        <p className="logo">
          <Link href="/">My webshop</Link>
        </p>
        
        <button type='button' className='cart-icon' onClick={() => setShowCart(true) } >
            <AiOutlineShopping/>
            <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        {console.log(showCart)}
        {showCart && <Card/>}
    </div>
  )
}

export default Navbar