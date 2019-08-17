import React from 'react'
import EditCardForm from '../../components/edit-card-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'

const EditCard = ({ match: { params } }) => (
  <>
    <h1>Edit Card</h1>
    <EditCardForm cardId={params.cardId} />
  </>
)

export default withRedirectOnNotAuth(withEditorsOnly(EditCard))
