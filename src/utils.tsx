export function arraysToJson(array1: any[], array2: any[]): object {
  // if (array1.length !== array2.length) {
  //   throw new Error('Arrays must have the same length');
  // }

  let jsonObject: object = {}

  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    jsonObject = { ...jsonObject, [array1[i].id]: array2[i]?.id ?? '' }
  }

  return jsonObject
}

function checkFieldValidation(validations: Array<{ [k: string]: any }>): boolean {

  if (validations.length === 0) {
    return true
  }

  for (const item of validations) {
    if (item['linkMimetypeGroup']?.includes('image')) {
      return true
    }
    if (!('in' in item)) {
      return true
    }

  }

  return false
}

export function getMappableFields(fields: Array<object>): Array<object> {

  const filteredFields = fields?.filter((field: { [k: string]: any }) => {
    if (field.id === 'internalName') {
      return false
    } else if ((field.type === 'Symbol' && checkFieldValidation(field.validations))
      || field.type === 'Object'
      || field.type === 'Date'
    ) {
      return true
    } else if (field.type === 'Link' && field.linkType === 'Asset' && checkFieldValidation(field.validations)) {
      return true
    } else {
      return false
    }
  })

  return filteredFields
}

export function getHelpIcon(fieldType: string): React.ReactNode {
  switch (fieldType) {
    case 'Symbol':
      return '(Text)'

    case 'Object':
      return '(RichText)'

    case 'Link':
      return '(Reference)'
    case 'Date':
      return '(Date)'
    default:
      return '(N/A)'
  }
}