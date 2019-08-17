import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import { trackAction, actions } from '../../analytics'
import useAuthProfile from '../../hooks/useAuthProfile'

const AddCommentForm = () => {
  const authProfile = useAuthProfile()

  if (!authProfile) {
    return 'Not logged in - not good'
  }

  const userId = auth.uid

  const [textFieldValue, setTextFieldValue] = useState('')
  const [isSaving, didSaveSucceedOrFail, save] = useDatabaseSave('comments')
  const [userDocument] = useDatabaseDocument('users', userId)
  const [cardDocument] = useDatabaseDocument('card', cardId)

  if (isSaving) {
    return 'Adding your comment...'
  }

  if (didSaveSucceedOrFail === true) {
    return 'Comment added!'
  }

  if (didSaveSucceedOrFail === false) {
    return 'Error adding your comment. Please try again.'
  }

  return (
    <>
      <TextField
        multiline
        value={textFieldValue}
        onChange={event => setTextFieldValue(event.target.value)}
      />
      <br />
      <Button
        onClick={async () => {
          const [documentId] = await save({
            card: cardDocument,
            comment: textFieldValue,
            createdBy: userDocument,
            createdAt: new Date()
          })

          trackAction(actions.COMMENT_ON_CARD, {
            cardId: documentId,
            userId
          })
        }}>
        Add
      </Button>
    </>
  )
}

export default withEditorsOnly(AddCommentForm)
