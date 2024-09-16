import { KernelD } from '../Kernel/defaults'
import { PopupI } from './interface'


/**
 * The default values for the props of Popup.
 * Defining the defaults for a component helps in two ways.
 * First, all the required properties of the components are automatically specified during instantiation of the component.
 * Second, it helps when you want to set certain common default values for props everytime you use the component.
 * To ensure nothing is left out or avoid unexpected behaviour due to lack of specification, specify the value for each property (except events, unless relevant) that's defined in the component's schema.
 * The order of props defined here is inherited by sb.
 */
export const PopupD: PopupI = {
  ...KernelD,
  _conf: {
    ...KernelD._conf,
    name: 'Popup',
    status: 'READY',
  },
  popupTitle: 'Popup title',
  isClosable: true,
  handleShow: () => {
  },
}