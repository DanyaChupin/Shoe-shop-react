import React, { useContext } from 'react'
import AppContext from '../components/context'

export const useCartPriceTotal = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)

  return { cartItems, setCartItems, totalPrice }
}
