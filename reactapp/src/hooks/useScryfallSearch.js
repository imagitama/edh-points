import { useState, useEffect, useRef } from 'react'
import { inDevelopment } from '../environment'

const scryFallApiUrl = 'https://api.scryfall.com'
const cardSearchEndpoint = 'cards/search?order=cmc&q='

const cardCacheById = {}
const cardCacheBySearchTerm = {}

const performFetch = url =>
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    return response.json()
  })

const fetchCardsBySearch = cardNameSearchTerm =>
  performFetch(`${scryFallApiUrl}/${cardSearchEndpoint}/${cardNameSearchTerm}`)

const useScryfallSearch = (cardNameSearchTerm = '') => {
  const [responseJson, setResponseJson] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const timer = useRef()

  const doFetch = async isMounted => {
    const onDone = ({ data }) => {
      if (!isMounted) {
        return
      }

      cardCacheBySearchTerm[cardNameSearchTerm] = data

      setResponseJson(data)
      setIsFetching(false)
      setIsErrored(false)
    }

    const onError = err => {
      console.error('[useScryfallSearch] Error fetching from Scryfall API', err)
      setResponseJson({})
      setIsFetching(false)
      setIsErrored(true)
    }

    setIsFetching(true)

    return fetchCardsBySearch(cardNameSearchTerm)
      .then(onDone)
      .catch(onError)
  }

  useEffect(() => {
    let isMounted = true // to prevent setting state when unmounted

    if (!cardNameSearchTerm) {
      return
    }

    if (cardNameSearchTerm in cardCacheBySearchTerm) {
      if (inDevelopment())
        console.log(
          `useScryfall: Card name search term ${cardNameSearchTerm} in cache`,
          cardCacheBySearchTerm[cardNameSearchTerm]
        )
      setResponseJson(cardCacheBySearchTerm[cardNameSearchTerm])
      return
    }

    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      if (!isMounted) {
        return
      }
      doFetch(isMounted)
    }, 500)

    return () => (isMounted = false)
  }, [cardNameSearchTerm])

  return [isFetching, isErrored, responseJson]
}

export default useScryfallSearch
