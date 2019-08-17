import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import Home from './containers/home'
import Login from './containers/login'
import Logout from './containers/logout'
import ViewCard from './containers/view-card'
import AddCard from './containers/add-card'
import EditCard from './containers/edit-card'
import PageHeader from './components/header'
import PageFooter from './components/footer'
import MyAccount from './containers/my-account'
import Admin from './containers/admin'
import PrivacyPolicy from './containers/privacy-policy'
import * as routes from './routes'
import SearchResults from './components/search-results'

const RouteWithMeta = ({ meta, ...routeProps }) => {
  useEffect(() => {
    document.title = `${meta.title} &mdash; MTG Card Rank`

    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', meta.description)
  }, [meta])

  return <Route {...routeProps} />
}

const App = ({ searchTerm }) => (
  <>
    <PageHeader />
    <main className="main">
      <Container maxWidth="lg">
        <SearchResults />

        {!searchTerm && (
          <Switch>
            <RouteWithMeta
              exact
              path={routes.home}
              component={Home}
              meta={{
                title: 'Point values for individual EDH cards',
                description:
                  'A website that attempts to assign a point value to every single EDH playable card to aid you in determining the strength of a deck.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.login}
              component={Login}
              meta={{
                title: 'Log in to manage cards',
                description:
                  'Use the log in form to log in to your account so that you can create, edit, comment on and vote on lists of cards.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.logout}
              component={Logout}
              meta={{
                title: 'Logging you out',
                description:
                  'Visit this page to automatically log out of your account.'
              }}
            />

            <RouteWithMeta
              exact
              path={routes.editCard}
              component={EditCard}
              meta={{
                title: 'Edit a single card',
                description:
                  'An overview of a single Magic The Gathering card that shows statistics such as which lists the card is featured in.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.addCard}
              component={AddCard}
              meta={{
                title: 'Add a single card',
                description:
                  'An overview of a single Magic The Gathering card that shows statistics such as which lists the card is featured in.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.viewCard}
              component={ViewCard}
              meta={{
                title: 'View a single card',
                description:
                  'An overview of a single Magic The Gathering card that shows statistics such as which lists the card is featured in.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.admin}
              component={Admin}
              meta={{
                title: 'Admins only area',
                description: 'A restricted space for admins only.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.myAccount}
              component={MyAccount}
              meta={{
                title: 'View details about your account',
                description:
                  'An overview of your account including a way to change your username and see statistics of your account.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.privacyPolicy}
              component={PrivacyPolicy}
              meta={{
                title: 'Our privacy policy',
                description:
                  'View the privacy policy of our website including what we do with your personal data.'
              }}
            />
          </Switch>
        )}
      </Container>
    </main>
    <PageFooter />
  </>
)

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(App)
