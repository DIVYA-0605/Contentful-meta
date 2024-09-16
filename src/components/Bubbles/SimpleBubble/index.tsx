import React from 'react'
import Kernel from '../../Kernel'
import { SimpleBubbleD } from './defaults'
import { SimpleBubbleI } from './interface'

export default function SimpleBubble(props: SimpleBubbleI): React.ReactElement {
  /**
   * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
   * This way we don't need to keep providing the minimum defaults everytime a component is added
   * and plus we don't end up mutating the originally provided props.
   * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
   */
  const updatedProps: SimpleBubbleI = {
    ...SimpleBubbleD,
    ...props,
  }

  //Returning the SimpleBubble enclosed within kernel
  return <Kernel {...updatedProps}>{updatedProps.children}</Kernel>
}