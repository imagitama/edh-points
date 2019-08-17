import React from 'react'
import { connect } from 'react-redux'
import CardList from '../card-list'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'

const CardRankings = () => {
  const [isLoading, isErrored, results] = useDatabase('cards')

  if (isLoading) return <LoadingIndicator />

  if (isErrored) {
    return <ErrorMessage>Failed to find cards</ErrorMessage>
  }

  if (!results.length) {
    return <div>No cards found</div>
  }

  return (
    <CardList
      cards={results.sort(
        ({ points: pointsA }, { points: pointsB }) => pointsB - pointsA
      )}
    />
  )
}

export default CardRankings
