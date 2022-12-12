import React from 'react'
import { useContext } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../components/context'
const Favorites = () => {
  const { favorite, onAddToFavorite } = useContext(AppContext)

  return (
    <div className="content">
      <div className="contentHeader">
        <h1>Мои закладки</h1>
      </div>

      <div className="cardList">
        {favorite.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}
export default Favorites
