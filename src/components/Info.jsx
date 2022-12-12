import React from 'react'
import { useContext } from 'react'
import AppContext from './context'

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext)
  return (
    <div className="noCartsInfo">
      <img src={image} alt="" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className="cartButtonOrder">
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
