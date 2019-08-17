import React from 'react'
import useDatabase from '../../hooks/useDatabase'

const VotesList = ({ cardId }) => {
  const [isLoading, isErrored, votes] = useDatabase('votes', null, {
    field: 'card',
    operator: '==',
    reference: {
      collection: 'cards',
      id: listId
    }
  })

  if (isLoading) {
    return 'Getting votes...'
  }

  if (isErrored) {
    return 'Failed to get votes'
  }

  if (!votes.length) {
    return 'Found no votes'
  }

  return (
    <ul>
      {votes.map(({ id, createdBy: { username }, vote }) => (
        <li key={id}>
          User <strong>{username}</strong> voted {vote}/10
        </li>
      ))}
    </ul>
  )
}

export default VotesList
