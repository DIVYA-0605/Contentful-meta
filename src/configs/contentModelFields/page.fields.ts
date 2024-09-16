// pageCommonFields are fields that are common across all page templates.
const pageCommonFields = [
  'pageThumbnail',
  'slug',
  'title',
  'shortTitle',
  'seoTitle',
  'seoDescription',
  'seoKeywords',
]

export const pageFields = {
  Generic: [
    ...pageCommonFields,
    'content',
    'noIndex',
    'noFollow',
    'isTranslucent',
  ],
  'Insight Article': [
    ...pageCommonFields,
    'publishDate',
    'authorsHeading',
    'authors',
    'menuList',
    'introSection',
    'content',
    'noIndex',
    'noFollow',
    'isTranslucent',
  ],
  'Press Release': [
    ...pageCommonFields,
    'publishDate',
    'authorsHeading',
    'authors',
    'document',
    'introSection',
    'content',
    'aboutUs',
    'endContent',
    'noIndex',
    'noFollow',
    'isTranslucent',
  ],
  Object: [...pageCommonFields],
}
