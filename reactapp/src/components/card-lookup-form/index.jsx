import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import useScryfall from '../../hooks/useScryfall'

const CardLookupForm = () => {
  const [cardNameInputVal, setCardNameInputVal] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFetching, isErrored, responseJson] = useScryfall(null, searchTerm)

  if (isFetching) {
    return 'Searching...'
  }

  if (isErrored) {
    return 'Failed to search via Scryfall! Check console'
  }

  return (
    <div style={{ backgroundColor: 'grey' }}>
      <TextField
        label="Enter card name"
        onChange={event => setCardNameInputVal(event.target.value)}
      />
      <Button onClick={() => setSearchTerm(cardNameInputVal)}>Search</Button>
      {responseJson.id ? (
        <>
          <hr />
          <TextField label="Card name" value={responseJson.name || ''} />
          <TextField label="Scryfall ID" value={responseJson.id || ''} />
          <TextField
            label="Image URL"
            value={responseJson.image_uris.normal || ''}
          />
        </>
      ) : null}
    </div>
  )
}

export default CardLookupForm
