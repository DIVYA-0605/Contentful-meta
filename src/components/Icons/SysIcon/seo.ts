import { injectSEO } from '../../../globals/utils'
import { IconI } from './interface'
export const injectIconSEO = (updatedProps: IconI) => {
  //return SEO Structured data json object

  const seoData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Icon',
    description: 'Representing a SysIcon component.',
    contentIcon: updatedProps.icon,
  }

  injectSEO(seoData)

}