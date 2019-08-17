import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CardImage from '../card-image'
import * as routes from '../../routes'

const CardListItem = ({
  id,
  scryfallCardId,
  imageUrl,
  points,
  reason,
  createdBy,
  createdOn,
  modifiedBy,
  modifiedOn
}) => (
  <div style={{ borderTop: '1px solid black', padding: '1rem 0' }}>
    <Grid container>
      <Grid item>
        <CardImage imageUrl={imageUrl} />
      </Grid>
      <Grid item>
        <h1>{points} points</h1>
        <br />
        <i>{reason}</i>
        <br />
        <Link to={routes.viewCard.replace(':cardId', id)}>View</Link> |{' '}
        <Link to={routes.editCard.replace(':cardId', id)}>Edit</Link>
      </Grid>
    </Grid>
  </div>
)

export default CardListItem
