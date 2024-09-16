import { SimpleSpanI } from '../../Texts/Spans/SimpleSpan/interface'
import { SimpleBubbleI } from '../SimpleBubble/interface'

/**
 * Badge interface enlists all the props (and their types) that Badge can have.
 */
export interface BadgeI extends SimpleBubbleI {
  variant?: 'primary' | 'secondary'
  content?: SimpleSpanI
  //bgColour?: BGCOLOURS
  //...enlist other
}
