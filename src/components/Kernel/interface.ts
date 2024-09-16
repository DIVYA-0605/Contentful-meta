import React, { ReactNode } from 'react'
import { HTMLTAGS } from '../../globals/types'

export type HTMLTagsType =
  | keyof React.JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export interface InteractiveI {
  isBlurred?: boolean
  isFocused?: boolean
  isHighlighted?: boolean
  isHotspot?: boolean
  isHotspotActive?: boolean
  isHotspotEnabled?: boolean
  isInteractive?: boolean
  isFocusable?: boolean
  isTrackable?: boolean
  isEnabled?: boolean
}

export interface KernelI<T extends HTMLTagsType = HTMLTAGS> extends InteractiveI {
  /**
   * Configuration information and meta-data of the component.
   */
  _conf?: {
    /**
     * Namespace identifies the use case(scope) of the component
     */
    NS?: 'Altus' | 'Reonomy' | 'FinanceActive' //others...
    /**
     * Friendly name of the component.
     */
    name?: string
    /**
     * Genus specifies the sub-classification of the component within a family.
     * For example `Cards` is a family and `Insights Card` is the genus of the family.
     */
    genus?: string
    /**
     * Family is used to group similar types of components(that share core functionality)
     */
    family?:
      | ''
      | 'AVATAR'
      | 'BAR'
      | 'BUBBLE'
      | 'BUTTON'
      | 'CARD'
      | 'CONTROL'
      | 'CALENDAR'
      | 'IMAGE'
      | 'LINK'
      | 'TEXT'
      | 'TIP'
      | 'PLACEHOLDER'
      | 'POPUP'
      | 'ICON'
      | 'CONTAINER'
      | 'ERROR'
      | 'HERO'
      | 'INDICATOR'
      | 'NAV'
      | 'TAB'
    status?:
      | 'TODO'
      | 'DEV'
      | 'TESTING'
      | 'DEBUGGING'
      | 'READY'
      | 'DEPRECATED'
      | 'ARCHIVED'
      | 'DISABLED'
    isDisabledContent?: string
    version?: string
    isIndexable?: boolean
    contentfulMeta?: {
      /**
       * Type of the component as defined in Contentful.
       */
      __typename: string
      /**
       * ID of the component in Contentful.
       */
      contentful_id: string
      /**
       * ID of the content instance of the component in Contentful.
       */
      id: string
      /**
       * Tags assigned to the component in Contentful.
       */
      tags?: string[]
      /**
       * Reference components allowed inside the component as defined in Contentful.
       * This is used to identify whether a child that's passed to the component should be allowed.
       */
      children?: []
      createdAt: string
      node_locale?: string
      /**
       * Description of the component in Contentful.
       */
      description?: string
      /**
       * Date when the component was added in Contentful.
       */
      dateAdded: string
      /**
       * Date when the component was last updated in Contentful.
       */
      dateUpdated: string
      //...enlist other meta props
    }
  }

  as?: T
  isAsIs?: boolean
  htmlAttr?: React.ComponentProps<T>
  children?: ReactNode | ReactNode[]

  /**
   * @todo if true, Show in full screen popup
   */
  isImmersive?: boolean
  isVisible?: boolean
  isPresent?: boolean
  isVisibleOnSmallScreen?: boolean
  isVisibleOnLargeScreen?: boolean
  theme?: 'LIGHT' | 'DARK'
  align?: 'LEFT' | 'RIGHT' | 'CENTER'
  //...enlist other core props that are not HTML attributes
}