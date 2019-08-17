import React from 'react'
import { connect } from 'react-redux'
import CardList from '../card-list'
import useDatabaseSearch from '../../hooks/useDatabaseSearch'

const SearchResults = ({ searchTerm }) => {
  if (!searchTerm) return null

  const [isLoading, isErrored, results] = useDatabaseSearch(
    'cards',
    'keywords',
    'array-contains',
    searchTerm
  )

  if (isLoading || isErrored) return null

  if (!results.length) {
    return <p>No cards found matching your search term</p>
  }

  return <CardList cards={results} />
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
