import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardRankings from '../../components/card-rankings'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const Home = () => {
  const classes = useStyles()
  return (
    <>
      <CardRankings />
    </>
  )
}

export default Home
