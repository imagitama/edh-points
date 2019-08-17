import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { allFieldsExceptAutogen as resourceFields } from '../../resources/cards'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'
import CardEditor from '../card-editor'

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  },
  button: {
    marginTop: '0.5rem'
  }
})

const AddCardForm = () => {
  const [isSaving, isErrored, save] = useDatabaseSave('cards')

  const onSubmit = (editingFields, userDocument) => {
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

      save(firebaseFields)
    } catch (err) {
      console.error(`[AddCardForm] Save failed`, err)
    }
  }

  return <CardEditor save={onSubmit} />
}

export default AddCardForm
