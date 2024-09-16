import { SimpleBubbleI } from '../SimpleBubble/interface'

/**
 * Tag interface enlists all the props (and their types) that Tag can have.
 */
export interface TagI extends SimpleBubbleI {
  isIcon: boolean
  text?: string
  handleClose?: Function
  //bgColour?: BGCOLOURS
  variant?: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  onRemove?: Function
  //...enlist other
}