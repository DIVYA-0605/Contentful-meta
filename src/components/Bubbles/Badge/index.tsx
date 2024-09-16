import React from 'react'
import SimpleSpan from '../../Texts/Spans/SimpleSpan'
import SimpleBubble from '../SimpleBubble'
import { BadgeD } from './defaults'
import styles from './index.module.scss'
import { BadgeI } from './interface'

export default function Badge(props: BadgeI): React.ReactElement {
  /**
   * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
   * This way we don't need to keep providing the minimum defaults everytime a component is added
   * and plus we don't end up mutating the originally provided props.
   * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
   */

  const updatedProps: BadgeI = {
    ...BadgeD,
    ...props,
  }
  let classname;
  // Determine the CSS class based on the 'variant' prop

  if (updatedProps.variant === 'primary') {
    classname = ' cn2 bn6';
  } else if (updatedProps.variant === 'secondary') {
    classname = ' cs2 bp2';
  }
  //Returning the Badge enclosed within SimpleBubble
  return <SimpleBubble
    {...updatedProps}
    htmlAttr={{
      className: `${styles.badgeRoot}  ${classname}`,
      role: 'region',
      'aria-label': 'Bubble Container',
    }}
  >
    {/* Render the content from updatedProps inside a <span> element */}
    <SimpleSpan {...updatedProps.content} />
  </SimpleBubble>

}