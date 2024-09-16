import React from 'react'
import GenericIcon from '../../Icons/SysIcon'
import SimpleBubble from '../SimpleBubble'
import { TagD } from './defaults'
import styles from './index.module.scss'
import { TagI } from './interface'

export default function Tag(props: TagI): React.ReactElement {
  /**
   * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
   * This way we don't need to keep providing the minimum defaults everytime a component is added
   * and plus we don't end up mutating the originally provided props.
   * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
   */

  const updatedProps: TagI = {
    ...TagD,
    ...props,
  }
  let classname
  let Size = `${styles[props.size]}`
  // Determine the CSS class based on the 'variant' prop

  if (updatedProps.variant === 'primary') {
    classname = ` ${styles.cn2} ${styles.bn6}`
  } else if (updatedProps.variant === 'secondary') {
    classname = `${styles.cs2} ${styles.bp2} `
  }

  const icon = updatedProps.isIcon && <div className={styles.closeIcon}>
    <GenericIcon icon='Close' size='sm' htmlAttr={{
      onClick: props.onRemove,
    }} />
  </div>


  //Returning the Tag enclosed within SimpleBubble
  return <SimpleBubble
    {...updatedProps}
    htmlAttr={{
      className: `${styles.tagRoot} ${classname} ${Size}`,
      role: 'button',
      style: updatedProps.htmlAttr?.style,
    }}
  >
    {/* Render a LabelText component with the text from updatedProps */}
    <p>{updatedProps.text}</p>
    {icon}
  </SimpleBubble>

}