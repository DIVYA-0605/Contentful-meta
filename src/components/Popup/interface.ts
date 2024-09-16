// import { KernelI } from 'src/components/Kernel';
import {KernelI} from '../../Kernel'

/**
 * Popup interface enlists all the props (and their types) that Popup can have.
 */
export interface PopupI extends KernelI {
  width?: string;
  height?: string;
  popupTitle?: string;
  /**
   * if true, close popup on click outside
   */
  isClosable?: boolean;
  /**
   * This props is only for developer purpose
   */
  popupTitleClassName?: string;
  // @todo implement all this props

  /**
   // * if true, show close btn
   // */
  //hasCloseBtn?: boolean;
  ///**
  // * if ture, show border
  // */
  //hasBorder?: boolean;
  ///**
  // * if true, drag the popup
  // */
  //isDraggable?: boolean;
  ///**
  // * if true, show underlay (i.e. blurred)
  // */
  //hasUnderlay?: boolean;
  ///**
  // * if true, background color transparent and translucent
  // */
  //underlayType?: 'TRANSLUCENT' | 'TRANSPARENT';
  ////...enlist other
  handleShow: (e: any) => void;
}