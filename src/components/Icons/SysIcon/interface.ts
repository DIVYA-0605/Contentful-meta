import { BGCOLOURS, COLOURS, ICONS } from '../../../globals/types'
import { KernelI } from '../../Kernel'

/**
 * SysIcon interface enlists all the props (and their types) that SysIcon can have.
 */
export interface IconI extends KernelI {
  icon?: ICONS;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconColour?: COLOURS | string;
  bgColour?: BGCOLOURS;
  isRounded?: boolean;
  //enlist components specific props over here...
}