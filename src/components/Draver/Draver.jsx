import React, { useState } from 'react'
import axios from 'axios'
import Info from '../Info'
import styles from './Draver.module.scss'
import { useCartPriceTotal } from '../../hooks/useCartPriceTotal'

const Draver = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCartPriceTotal()
  const [orderId, setOrderId] = useState(null)
  const [isOrderCoplited, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {
        data,
      } = await axios.post(
        'https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/orders/',
        { items: cartItems },
      )
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      cartItems.forEach((item) => {
        axios.delete(
          `https://635eaa1bed25a0b5fe4ac6a7.mockapi.io/cart/${item.id}`,
        )
      })
    } catch (error) {
      alert('Не удалось создать заказ:(')
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <button className={styles.drawerButtonRemove} onClick={onClose}>
            <img width={11} height={11} src="/img/Remove.svg" alt="Remove" />
          </button>
        </h2>

        {items.length > 0 ? (
          <>
            <div className={styles.drawerItems}>
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                  <img
                    width={70}
                    height={70}
                    src={obj.imageUrl}
                    alt="Sneakers"
                  />
                  <div className={styles.cartItemInfo}>
                    <p>{obj.title}</p>
                    <b>{obj.price}руб.</b>
                  </div>
                  <button
                    onClick={() => onRemove(obj.id)}
                    className="cartButtonRemove"
                  >
                    <img
                      width={11}
                      height={11}
                      src="/img/Remove.svg"
                      alt="Remove"
                    />
                  </button>
                </div>
              ))}
            </div>

            <ul>
              <li>
                <span>Итого:</span>

                <b>{totalPrice}руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>

                <b> {(totalPrice * 0.05).toFixed(2)} руб.</b>
              </li>
            </ul>
            <button
              disabled={isLoading}
              onClick={onClickOrder}
              className={styles.cartButtonOrder}
            >
              {isLoading ? 'Отправка заказа...' : 'Оформить заказ'}
            </button>
          </>
        ) : (
          <Info
            title={isOrderCoplited ? 'Заказ оформлен!' : 'Корзина пуста'}
            description={
              isOrderCoplited
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы один товар, что бы сделать заказ!'
            }
            image={isOrderCoplited ? '/img/complited.jpg' : '/img/draver.jpg'}
          />
        )}
      </div>
    </div>
  )
}

export default Draver
