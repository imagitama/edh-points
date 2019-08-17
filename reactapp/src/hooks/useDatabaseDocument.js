import { useEffect, useState } from 'react'
import { firestore } from 'firebase/app'

const useDatabaseDocument = (collectionName, documentId = null) => {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    if (!documentId) {
      return
    }

    const doc = firestore()
      .collection(collectionName)
      .doc(documentId)

    setDocument(doc)
  }, [documentId])

  return [document]
}

export default useDatabaseDocument
