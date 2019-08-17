import React, { useState, useEffect, useRef } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import {
  allFieldsExceptAutogen as resourceFields,
  editableFields
} from '../../resources/cards'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields,
  convertFirebaseDocIntoEditableFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'
import CardEditor from '../card-editor'
import useDatabase from '../../hooks/useDatabase'
import useDelay from '../../hooks/useDelay'

const EditCardForm = ({ cardId }) => {
  const [isFetchingCard, isFetchingCardFail, card] = useDatabase(
    'cards',
    cardId
  )
  const [isSaving, isSavingFail, isSavingSuccess, save] = useDatabaseSave(
    'cards',
    cardId
  )
  const shouldShowMessage = !useDelay(2000, [
    isSaving,
    isSavingFail,
    isSavingSuccess
  ])

  if (isFetchingCard || !card) {
    return <LoadingIndicator />
  }

  if (isFetchingCardFail) {
    return (
      <ErrorMessage>
        Failed to find card for editing - are you sure it exists?
      </ErrorMessage>
    )
  }

  const onSubmit = async (editingFields, userDocument) => {
    if (
      !editingFields.scryfallCardId ||
      !editingFields.imageUrl ||
      !editingFields.points
    ) {
      console.error('Cannot save card - at least one field is empty')
      return
    }

    try {
      const allFields = mergeResourceFields(editingFields, resourceFields)
      const fieldsIncludingMeta = appendNonEditableResourceFields(
        allFields,
        userDocument
      )
      const firebaseFields = convertResourceFieldsIntoFirebaseDoc(
        fieldsIncludingMeta
      )

      await save(firebaseFields)
    } catch (err) {
      console.error(`[EditCardForm] Save failed`, err)
    }
  }

  console.log({ card })

  return (
    <>
      {isSaving && shouldShowMessage && <Snackbar message="Saving..." open />}
      {isSavingFail && shouldShowMessage && (
        <Snackbar message="Failed to edit the card" open />
      )}
      {isSavingSuccess && shouldShowMessage && (
        <Snackbar message="Edited successfully" open />
      )}
      <CardEditor
        save={onSubmit}
        fields={convertFirebaseDocIntoEditableFields(card, editableFields)}
      />
    </>
  )
}

export default EditCardForm
