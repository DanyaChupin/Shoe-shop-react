import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Card from '../components/Card/Card'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(
          'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/orders',
        )
        setOrders(data.map((obj) => obj.items).flat())
        setIsLoading(false)
      } catch (error) {
        alert('Возникла ошибка загрузки заказов!')
      }
    })()
  }, [])

  return (
    <div className="content">
      <div className="contentHeader">
        <h1>Мои заказы</h1>
      </div>

      <div className="cardList">
        {orders.map((item) => (
          <Card key={item.id} {...item} isLoading={isLoading} />
        ))}
      </div>
    </div>
  )
}
export default Orders
