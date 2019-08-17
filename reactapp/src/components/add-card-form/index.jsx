import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { allFieldsExceptAutogen as resourceFields } from '../../resources/cards'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import CardEditor from '../card-editor'
import { Button } from '@material-ui/core'

const AddCardForm = () => {
  const [isSaving, isSavingFail, isSavingSuccess, save] = useDatabaseSave(
    'cards'
  )
  const [shouldShowMessage, setShouldShowMessage] = useState(true)

  useEffect(() => {
    setShouldShowMessage(true)
  }, [isSaving, isSavingFail, isSavingSuccess])

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
      console.error(`[AddCardForm] Save failed`, err)
    }
  }

  const HideButton = (
    <Button size="small" onClick={() => setShouldShowMessage(false)}>
      Hide
    </Button>
  )

  return (
    <>
      {isSaving && shouldShowMessage && <Snackbar message="Saving..." open />}
      {isSavingFail && shouldShowMessage && (
        <Snackbar message="Failed to add the card" open action={HideButton} />
      )}
      {isSavingSuccess && shouldShowMessage && (
        <Snackbar message="Added successfully" open action={HideButton} />
      )}
      <CardEditor save={onSubmit} />
    </>
  )
}

export default AddCardForm
