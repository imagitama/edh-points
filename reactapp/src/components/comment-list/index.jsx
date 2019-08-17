import React from 'react'
import Comment from '../comment'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'

const CommentList = ({ cardId }) => {
  const [isLoading, isErrored, comments] = useDatabase('comments', null, {
    field: 'list',
    operator: '==',
    reference: {
      collection: 'cards',
      id: cardId
    }
  })

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return 'Failed to load comments for this card'
  }

  if (!comments.length) {
    return 'No comments found'
  }

  return (
    <>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  )
}

export default CommentList
