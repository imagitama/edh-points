import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default (collectionName, documentId = null) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const save = async fields => {
    setIsSaving(true)
    setIsErrored(false)
    setIsSuccess(false)

    let document

    try {
      const collection = firebase.firestore().collection(collectionName)

      if (documentId) {
        await collection.doc(documentId).set(fields, { merge: true })
      } else {
        document = await collection.add(fields)
      }

      setIsSaving(false)
      setIsErrored(false)
      setIsSuccess(true)

      return [documentId ? documentId : document.id]
    } catch (err) {
      console.error(err)
      setIsSaving(false)
      setIsErrored(true)
      setIsSuccess(false)
    }
  }

  return [isSaving, isErrored, isSuccess, save]
}
