import React from 'react'
import Card from '../components/Card/Card'

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
  return (
    <div className="content">
      <div className="contentHeader">
        <h1>Все кроссовки</h1>
        <div className="search-block">
          <img width={14} height={14} src="/img/Search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            type="text"
            placeholder="Поиск..."
            value={searchValue}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="drawerButtonRemove inputClear"
            >
              <img width={11} height={11} src="/img/Remove.svg" alt="Remove" />
            </button>
          )}
        </div>
      </div>

      <div className="cardList">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue))
          .map((item) => (
            <Card
              key={item.id}
              {...item}
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={(obj) => onAddToFavorite(obj)}
            />
          ))}
      </div>
    </div>
  )
}
export default Home
