import React from 'react'
import { Grid, Button } from '@material-ui/core'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import ErrorMessage from '../error-message'
import CardImage from '../card-image'
import useScryfall from '../../hooks/useScryfall'

const SingleCardView = ({ cardId }) => {
  const [isLoading, isErrored, card] = useDatabase('cards', cardId)
  const [isRetrievingCard, isFailedRetrievingCard, scryfallCard] = useScryfall(
    card ? card.scryfallCardId : null
  )

  if (isLoading || isRetrievingCard) {
    return <LoadingIndicator />
  }

  if (isErrored || !card || isFailedRetrievingCard || !scryfallCard) {
    return <ErrorMessage>Failed to find card - does it exist?</ErrorMessage>
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <figure className="card-wrapper text-center" align="center">
            <CardImage imageUrl={card.imageUrl} />
          </figure>
        </Grid>
        <Grid item xs={12} sm={7}>
          <h1>{scryfallCard.name}</h1>
          <div className="card-rating">
            <p>{card.points} / 100</p>
            <p>
              <Button className="" variant="contained" color="primary">
                Rate
              </Button>
              <Button className="" variant="outlined" color="">
                Save
              </Button>
            </p>
          </div>
          <div className="card-props">
            <p>
              [cmc cost]
              <i class="ms ms-2 ms-cost" />
              <i class="ms ms-u ms-cost" />
            </p>
            <p>
              <i class="ms ms-planeswalker ms-fw" /> {scryfallCard.type_line}
            </p>
            <p>{scryfallCard.oracle_text}</p>
            <p>{scryfallCard.flavor_text}</p>
          </div>
          <hr />
          <div className="card-discussion">[comments]</div>
        </Grid>
      </Grid>
    </>
  )
}

export default SingleCardView
