import { firestore } from 'firebase/app'

const isDebug = true

const secondsToDate = seconds => new Date(seconds * 1000)

const mapDates = doc => {
  const entries = Object.entries(doc)

  const newDoc = entries.reduce((finalDoc, [key, value]) => {
    return {
      ...finalDoc,
      [key]:
        value && value.hasOwnProperty('seconds')
          ? secondsToDate(value.seconds)
          : value
    }
  }, {})

  return newDoc
}

const getDataFromReference = async record => {
  const result = await record.get()
  return {
    ...result.data(),
    id: record.id
  }
}

const mapReferences = async doc => {
  const newDoc = { ...doc }

  const results = await Promise.all(
    Object.entries(newDoc).map(async ([key, value]) => {
      if (value && value instanceof firestore.DocumentReference) {
        return [key, await getDataFromReference(value)]
      }
      return [key, await Promise.resolve(value)]
    })
  )

  results.forEach(([key, value]) => (newDoc[key] = value))

  return newDoc
}

export const getDocumentById = async (
  collectionName,
  documentId,
  useRefs = true
) => {
  if (!collectionName) {
    throw new Error('No collection name!')
  }
  if (!documentId) {
    throw new Error('No document ID!')
  }

  const collection = firestore().collection(collectionName)

  if (isDebug) console.log(`[useDatabase]`, { collectionName, documentId })

  const doc = await collection.doc(documentId).get()
  const data = await doc.data()

  if (!data) {
    throw new Error(
      `No data found for document ${documentId} in collection ${collectionName}`
    )
  }

  const docsWithDates = mapDates({
    ...data,
    id: documentId
  })

  const mappedDoc = useRefs ? await mapReferences(docsWithDates) : docsWithDates

  return mappedDoc
}

export const searchDocuments = async (
  collectionName,
  searchObj = null,
  useRefs = true
) => {
  if (!collectionName) {
    throw new Error('No collection name!')
  }

  const collection = firestore().collection(collectionName)

  let query

  if (searchObj) {
    if (searchObj instanceof Array) {
      query = searchObj.reduce((queryChain, searchObjChild) => {
        let value

        if (searchObjChild.reference) {
          value = firestore()
            .collection(searchObjChild.reference.collection)
            .doc(searchObjChild.reference.id)
        } else {
          value = searchObjChild.value
        }

        return queryChain.where(
          searchObjChild.field,
          searchObjChild.operator,
          value
        )
      }, collection)
    } else if (searchObj.reference) {
      const reference = firestore()
        .collection(searchObj.reference.collection)
        .doc(searchObj.reference.id)

      query = collection.where(searchObj.field, searchObj.operator, reference)
    } else {
      query = collection.where(
        searchObj.field,
        searchObj.operator,
        searchObj.value
      )
    }
  } else {
    query = collection
  }

  const results = await query.get()

  const docs = results.docs
    .map(doc => ({ ...doc.data(), id: doc.id }))
    .map(mapDates)
  const docsWithReferences = useRefs
    ? await Promise.all(docs.map(mapReferences))
    : docs

  return docsWithReferences
}
