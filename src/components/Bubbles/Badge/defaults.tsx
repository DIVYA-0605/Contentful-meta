import { SimpleSpanD } from '../../Texts/Spans/SimpleSpan/defaults'
import { SimpleBubbleD } from '../SimpleBubble/defaults'
import { BadgeI } from './interface'


/**
 * The default values for the props of BadgeInteractive.
 * Defining the defaults for a component helps in two ways.
 * First, all the required properties of the components are automatically specified during instantiation of the component.
 * Second, it helps when you want to set certain common default values for props everytime you use the component.
 * To ensure nothing is left out or avoid unexpected behaviour due to lack of specification, specify the value for each property (except events, unless relevant) that's defined in the component's schema.
 * The order of props defined here is inherited by sb.
 */
export const BadgeD: BadgeI = {
  ...SimpleBubbleD,
  _conf: {
    ...SimpleBubbleD._conf,
    name: 'Badge',
    status: 'READY',
  },
  content: {
    ...SimpleSpanD,
    textContent: '16',
  },
  //bgColour: 'bn5',
  variant: 'primary'
}