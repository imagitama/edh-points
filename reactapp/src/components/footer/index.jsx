import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useUser from '../../hooks/useUser'
import * as routes from '../../routes'

const navItems = [
  {
    url: routes.login,
    label: 'Login',
    ifLoggedInOnly: false
  },
  {
    url: routes.logout,
    label: 'Logout',
    ifLoggedInOnly: true
  },
  {
    url: routes.addCard,
    label: 'Add Card',
    ifLoggedInOnly: true
  },
  {
    url: routes.admin,
    label: 'Admin',
    ifLoggedInOnly: true
  }
]

const useStyles = makeStyles({
  footer: {
    margin: '3rem 0 0 0',
    padding: '1rem 2rem',
    fontSize: '16px'
  }
})

const PageFooter = () => {
  const classes = useStyles()
  const user = useUser()

  return (
    <footer className={classes.footer} align="right" color="">
      {user ? `You are logged in as ${user.name}` : 'Not logged in'}
      <br />
      {navItems.map(({ url, label, ifLoggedInOnly }) => (
        <Link to={url}>{label}</Link>
      ))}
    </footer>
  )
}

export default connect()(PageFooter)
