export const fieldsMappingPreset = [
  {
    'fromContentType': 'eventObject',
    'toContentType': 'cardComponent',
    'toTemplate': 'Events',
    'fromFieldIds': [
      'eventType',
      'eventName',
      'startTime',
      'endTime',
      'description',
      'image',
      'internalName',
      'address',
      'registerUrl',
    ],
    'toFieldIds': [
      'subHeading',
      'heading',
      'startTime',
      'endTime',
      'description',
      'image',
    ],
  },
]