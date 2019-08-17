import React from 'react'

function getWidthFromSize(size) {
  switch (size) {
    case 'sm':
      return '100'
    case 'md':
      return '150'
    case 'lg':
      return '200'
    default:
      throw new Error(`Unknown card image size ${size}`)
  }
}

const CardImage = ({ scryfallCardId, imageUrl, size = 'md' }) => {
  if (!imageUrl && !scryfallCardId) {
    return null
  }

  return (
    <img
      src={
        imageUrl ||
        `https://img.scryfall.com/cards/normal/front/7/c/${scryfallCardId}.jpg`
      }
      alt="Scryfall card image"
      width={getWidthFromSize(size)}
    />
  )
}

export default CardImage
