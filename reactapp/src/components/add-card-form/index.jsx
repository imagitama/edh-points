import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { allFieldsExceptAutogen as resourceFields } from '../../resources/cards'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import CardEditor from '../card-editor'
import useDelay from '../../hooks/useDelay'

const AddCardForm = () => {
  const [isSaving, isSavingFail, isSavingSuccess, save] = useDatabaseSave(
    'cards'
  )
  const shouldShowMessage = !useDelay(2000, [
    isSaving,
    isSavingFail,
    isSavingSuccess
  ])

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

  return (
    <>
      {isSaving && shouldShowMessage && <Snackbar message="Saving..." open />}
      {isSavingFail && shouldShowMessage && (
        <Snackbar message="Failed to add the card" open />
      )}
      {isSavingSuccess && shouldShowMessage && (
        <Snackbar message="Added successfully" open />
      )}
      <CardEditor save={onSubmit} />
    </>
  )
}

export default AddCardForm
