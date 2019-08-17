import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import * as routes from '../../routes'
import Searchbar from '../../components/searchbar'

const useStyles = makeStyles({
  header: {
    padding: '1rem 1rem',
    borderBottom: '1px solid #260b36',
    marginBottom: '4rem',
    background: 'rgb(100, 100, 150)',
    ['@media (min-width: 600px)']: {
      padding: '2rem 2rem'
    }
  },
  gridColSearchbar: {
    ['@media (max-width: 959px)']: {
      order: '3'
    }
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.2',
    textDecoration: 'none !important',
    color: 'white',
    display: 'block',
    padding: '1rem',
    textTransform: 'uppercase',
    ['@media (min-width: 960px)']: {
      padding: '1rem 0'
    },
    fontFamily: '"Patua On", sans-serif'
  },
  menuToggleIcon: {
    width: '4rem',
    height: '3rem',
    fill: 'white'
  },
  menuList: {
    width: '280px'
  },
  menuListLink: {
    color: 'inherit',
    textDecoration: 'none'
    // todo: fix appearance if link in menu
  },
  listItemIcon: {
    color: '#240b36'
  }
})

const PageHeader = () => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Grid container>
        <Grid item xs={8} md={4} lg={4} align="left">
          <Link to={routes.home} className={classes.logo}>
            EDH Points
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={classes.gridColSearchbar}
          align="center">
          <Searchbar />
        </Grid>
        <Grid item xs={4} md={2} lg={4} align="right" />
      </Grid>
    </header>
  )
}

export default PageHeader
