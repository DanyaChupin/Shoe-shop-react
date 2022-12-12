import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Header from './components/Header/Header'
import Draver from './components/Draver/Draver'
import Favorites from './pages/Favorites'
import AppContext from './components/context'
import Orders from './pages/Orders'
function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorite, setFavorite] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsRespons = await axios.get(
          'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/items',
        )
        const cartRespons = await axios.get(
          'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/cart',
        )
        const favoritetRespons = await axios.get(
          'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/favorite',
        )

        setIsLoadingData(false)
        setCartItems(cartRespons.data)
        setFavorite(favoritetRespons.data)
        setItems(itemsRespons.data)
      } catch (error) {
        alert('При запросе данных произошла ошибка!')
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id),
      )
      if (findItem) {
        setCartItems(
          (prev) =>
            prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
          axios.delete(
            `https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/cart/${findItem.id}`,
          ),
        )
      } else {
        const { data } = await axios.post(
          'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/cart',
          obj,
        )
        setCartItems((prev) => [...prev, data])
      }
    } catch (error) {
      console.log(error)
      alert('Ошибка при добавлени в корзину...')
    }
  }

  const onRemoveToCart = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      axios.delete(`https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/cart/${id}`)
    } catch (error) {
      alert('Ошибка при удалении из корзины...')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(
          `https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/favorite/${obj.id}`,
        )
        setFavorite((prev) =>
          prev.filter((item) => Number(item.perentId) !== Number(obj.id)),
        )
      } else {
        const { data } = await axios.post(
          `https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/favorite`,
          obj,
        )

        setFavorite((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemFavorited = (id) => {
    return favorite.some((obj) => Number(obj.parentId) === Number(id))
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorite,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
        isLoadingData,
        isItemFavorited,
      }}
    >
      <div className="wrapper">
        <Header onClickCart={() => setCartOpened(true)} />
        <div>
          <Draver
            onRemove={onRemoveToCart}
            items={cartItems}
            onClose={() => setCartOpened(false)}
            opened={cartOpened}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} exact />
          <Route path="/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
