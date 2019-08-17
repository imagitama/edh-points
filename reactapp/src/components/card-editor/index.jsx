import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper } from '@material-ui/core'
import useScryfall from '../../hooks/useScryfall'
import CardImage from '../card-image'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import useScryfallSearch from '../../hooks/useScryfallSearch'
import useUser from '../../hooks/useUser'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  },
  button: {
    marginTop: '0.5rem'
  }
})

const CardEditor = ({ save, fields = null }) => {
  const [editingFields, setEditingFields] = useState(fields || {})
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, isFailedSearching, searchResults] = useScryfallSearch(
    searchTerm
  )
  const classes = useStyles()
  const [, , user] = useUser()
  const [userDocument] = useDatabaseDocument('users', user ? user.id : null)

  useEffect(() => {
    if (!fields) {
      return
    }
    setEditingFields(fields)
  }, [fields])

  if (!user || isFailedSearching) {
    return <ErrorMessage>Error?</ErrorMessage>
  }

  if (!userDocument || isSearching) {
    return <LoadingIndicator />
  }

  const setFieldValue = (name, value) =>
    setEditingFields({
      ...editingFields,
      [name]: value
    })

  const setFieldValues = fields =>
    setEditingFields({
      ...editingFields,
      ...fields
    })

  return (
    <>
      {!editingFields.scryfallCardId && (
        <Paper className={classes.paper}>
          <strong>Search</strong>
          <br />
          <TextField
            label="Enter a card name"
            onChange={event => setSearchTerm(event.target.value)}
            fullWidth
            helperText="Automatically searches Scryfall"
          />
          <br />
          {searchResults &&
            searchResults.map(result => (
              <>
                {result.image_uris ? (
                  <CardImage imageUrl={result.image_uris.normal} />
                ) : (
                  result.card_faces.map(cardFace => (
                    <CardImage imageUrl={cardFace.image_uris.normal} />
                  ))
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFieldValues({
                      scryfallCardId: result.id,
                      imageUrl: result.image_uris.normal
                    })
                  }}
                  className={classes.button}>
                  Select Card
                </Button>
              </>
            ))}
        </Paper>
      )}

      <Paper className={classes.paper}>
        <strong>Add Card</strong>
        <br />
        <CardImage imageUrl={editingFields.imageUrl} />
        <TextField
          label="Scryfall card ID"
          value={editingFields.scryfallCardId}
          fullWidth
          disabled
        />
        <TextField
          label="Image URL"
          value={editingFields.imageUrl}
          fullWidth
          helperText="Leave this as-is unless you want specific art"
        />
        <TextField
          label="Points"
          value={editingFields.points}
          onChange={event => setFieldValue('points', event.target.value)}
          helperText="1 being worst, 100 best card in the game"
        />
        <TextField
          label="Reasons for rank"
          value={editingFields.reason}
          onChange={event => setFieldValue('reason', event.target.value)}
          fullWidth
          multiline
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => save(editingFields, userDocument)}
          className={classes.button}>
          {fields ? 'Edit' : 'Add'} Card
        </Button>
        <br />
        Editing as user {user.name}
      </Paper>
    </>
  )
}

export default CardEditor
