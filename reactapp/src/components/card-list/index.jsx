import React from 'react'
import CardListItem from '../card-list-item'

const CardList = ({ cards }) => (
  <div>
    {cards.map(card => (
      <CardListItem key={card.id} {...card} />
    ))}
  </div>
)

export default CardList
