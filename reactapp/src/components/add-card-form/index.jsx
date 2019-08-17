import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { allFieldsExceptAutogen as resourceFields } from '../../resources/cards'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import CardEditor from '../card-editor'

const AddCardForm = () => {
  const [isSaving, isErrored, save] = useDatabaseSave('cards')
  const [wasSavedSuccessfully, setWasSavedSuccessfully] = useState(null) // TODO: Move to hook?

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
      setWasSavedSuccessfully(true)
    } catch (err) {
      console.error(`[AddCardForm] Save failed`, err)
    }
  }

  return (
    <>
      {isSaving && <Snackbar message="Saving..." open />}
      {isErrored && <Snackbar message="Failed to edit the card" open />}
      {wasSavedSuccessfully && <Snackbar message="Edited successfully" open />}
      <CardEditor save={onSubmit} />
    </>
  )
}

export default AddCardForm
