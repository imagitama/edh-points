import { useState, useEffect } from 'react'
import useAuthProfile from './useAuthProfile'
import { getDocumentById } from '../database'

const isDebug = true

// Returns the user document using the ID provided by Firebase (in Redux)
export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [knownAuthProfile, setKnownAuthProfile] = useState(null)
  const authProfile = useAuthProfile()

  if (!authProfile) {
    if (isDebug) console.warn('[useUser] No auth profile - false')
    return false
  }

  const lookupUser = async () => {
    let userDocument

    setIsLoading(true)
    setIsErrored(false)

    if (!authProfile.uid) {
      return
    }

    try {
      userDocument = await getDocumentById('users', authProfile.uid)

      setIsLoading(false)
      setIsErrored(false)
      setKnownAuthProfile(userDocument)
    } catch (err) {
      console.error(`[useUser] Failed to get user document by ID`, err)
      setIsErrored(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    lookupUser()
  }, [authProfile])

  return [isLoading, isErrored, knownAuthProfile]
}
