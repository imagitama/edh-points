import React from 'react'
import AddCardForm from '../../components/add-card-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'

const AddCard = () => (
  <>
    <h1>Add Card</h1>
    <AddCardForm />
  </>
)

export default withRedirectOnNotAuth(withEditorsOnly(AddCard))
