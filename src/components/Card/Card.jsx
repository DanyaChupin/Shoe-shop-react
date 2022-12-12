import React, { useState, useContext } from 'react'
import ContentLoader from 'react-content-loader'
import styles from './Card.module.scss'
import AppContext from '../context'
const Card = ({
  id,
  title,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  favorited = false,
}) => {
  const { isLoadingData, isItemAdded, isItemFavorited } = useContext(AppContext)

  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, parentId: id, title, imageUrl, price }
  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickFavorite = () => {
    onFavorite(obj)
    setIsFavorite(!isFavorite)
  }
  return (
    <div className={styles.card}>
      {isLoadingData ? (
        <ContentLoader
          speed={2}
          width={155}
          height={215}
          viewBox="0 0 155 265"
          backgroundcolor="#f3f3f3"
          foregraundсolor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onFavorite && (
              <button
                className={styles.cardButtonLike}
                onClick={onClickFavorite}
              >
                <img
                  width={11}
                  height={11}
                  src={
                    isItemFavorited(id) || isFavorite
                      ? '/img/btn-checked.svg'
                      : '/img/Heart.svg'
                  }
                  alt="Like"
                />
              </button>
            )}
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <p>{title}</p>
          <div className={styles.cardBottom}>
            <div className={styles.cardPrice}>
              <p>Цена:</p>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <button className={styles.cardButtonAdd} onClick={onClickPlus}>
                <img
                  width={11}
                  height={11}
                  src={
                    isItemAdded(id) ? '/img/btn-checked.svg' : '/img/Plus.svg'
                  }
                  alt="Plus"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
