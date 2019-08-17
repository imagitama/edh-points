import React from 'react'
import { Container } from '@material-ui/core'
import SingleCardView from '../../components/single-card-view'

const Card = ({ match: { params } }) => (
  <>
    <Container maxWidth="lg">
      <SingleCardView cardId={params.cardId} />
    </Container>
  </>
)

export default Card
