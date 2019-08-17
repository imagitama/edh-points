export const mergeResourceFields = (newFields, allFields) =>
  Object.entries(allFields)
    .map(([fieldName, fieldDetails]) => [
      fieldName,
      {
        ...fieldDetails,
        value: newFields[fieldName]
          ? newFields[fieldName]
          : fieldDetails.defaultValue
      }
    ])
    .reduce(
      (newObj, [fieldName, fieldDetails]) => ({
        ...newObj,
        [fieldName]: fieldDetails
      }),
      {}
    )

export const convertResourceFieldsIntoFirebaseDoc = fields =>
  Object.entries(fields)
    .map(([fieldName, fieldDetails]) => [fieldName, fieldDetails.value])
    .reduce(
      (newObj, [fieldName, fieldValue]) => ({
        ...newObj,
        [fieldName]: fieldValue
      }),
      {}
    )

export const convertFirebaseDocIntoEditableFields = (doc, editableFields) =>
  Object.entries(doc)
    .filter(([fieldName]) =>
      Object.values(editableFields).find(({ name }) => name === fieldName)
    )
    .reduce(
      (newObj, [fieldName, fieldValue]) => ({
        ...newObj,
        [fieldName]: fieldValue
      }),
      {}
    )

export const appendNonEditableResourceFields = (
  existingFields,
  userDocument,
  documentId = null
) => {
  if (!userDocument) {
    throw new Error(
      'Cannot append non editable resource fields - no user document provided!'
    )
  }

  return {
    ...existingFields,
    ...(!documentId
      ? {
          createdAt: {
            value: new Date()
          },
          createdBy: {
            value: userDocument
          }
        }
      : {
          modifiedBy: {
            value: userDocument
          }
        }),
    modifiedAt: {
      value: new Date()
    }
  }
}

export const addOrRemoveOptionFromFieldValue = (currentValue, clickedValue) => {
  if (currentValue.includes(clickedValue)) {
    return currentValue.filter(
      valueUnderTest => valueUnderTest !== clickedValue
    )
  }
  return currentValue.concat([clickedValue])
}

export const convertTextareaValueToOptions = textareaVal =>
  textareaVal.split('\n')

export const convertArrayOfValuesIntoTextareaVal = (arrayOfVals = []) =>
  arrayOfVals.join('\n')
