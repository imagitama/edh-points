import { useState, useEffect } from 'react'
import { searchDocuments, getDocumentById } from '../database'

export default (
  collectionName,
  documentId = null,
  searchObj = null,
  useRefs = true
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [results, setResults] = useState(documentId ? null : [])

  const getData = async () => {
    setIsLoading(true)

    try {
      if (documentId) {
        const mappedDoc = await getDocumentById(
          collectionName,
          documentId,
          useRefs
        )

        setIsLoading(false)
        setResults(mappedDoc)
        return
      }

      const docsWithReferences = await searchDocuments(
        collectionName,
        searchObj,
        useRefs
      )

      setIsLoading(false)
      setResults(docsWithReferences)
    } catch (err) {
      console.error(
        `[useDatabase] Failed to query database`,
        { collectionName, documentId },
        err
      )

      setIsErrored(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return [isLoading, isErrored, results]
}
