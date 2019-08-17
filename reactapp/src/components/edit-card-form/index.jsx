import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper } from '@material-ui/core'
import { allFieldsExceptAutogen as resourceFields } from '../../resources/cards'
import useScryfall from '../../hooks/useScryfall'
import CardImage from '../card-image'
import {
  convertResourceFieldsIntoFirebaseDoc,
  appendNonEditableResourceFields,
  mergeResourceFields
} from '../../form-utils'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import useUser from '../../hooks/useUser'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'
import CardEditor from '../card-editor'
import useDatabase from '../../hooks/useDatabase'

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  },
  button: {
    marginTop: '0.5rem'
  }
})

const EditCardForm = ({ cardId }) => {
  const [isLoading, isErrored, card] = useDatabase('cards', cardId)
  const classes = useStyles()
  const [isSaving, isErroredSaving, save] = useDatabaseSave('cards')

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return (
      <ErrorMessage>
        Failed to find card for editing - are you sure it exists?
      </ErrorMessage>
    )
  }

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
      console.error(`[EditCardForm] Save failed`, err)
    }
  }

  return <CardEditor save={onSubmit} fields={card} />
}

export default EditCardForm
