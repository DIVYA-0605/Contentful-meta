import React from 'react'
import GenericIcon from '../Icons/SysIcon'
import Kernel from '../Kernel'
import { PopupD } from './defaults'
import PopupStyles from './index.module.scss'
import { PopupI } from './interface'

export default function Popup(props: PopupI): React.ReactElement {
  /**
   * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
   * This way we don't need to keep providing the minimum defaults everytime a component is added
   * and plus we don't end up mutating the originally provided props.
   * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
   */
  const updatedProps: PopupI = {
    ...PopupD,
    ...props,
  }

  let isClosable = ''

  if (updatedProps.isClosable) {
    isClosable = PopupStyles.dNone
  }


  //Returning the Popup enclosed within Kernel
  return (
    <Kernel {...updatedProps} htmlAttr={{
      className: `${PopupStyles.popupRoot} ${updatedProps.htmlAttr?.className ?? ''}`,
      style: { width: updatedProps.width, height: updatedProps.height },

    }}>
      <div className={PopupStyles.popup}>

        <div className={PopupStyles.popupTitleRoot}>
          <p className={`${PopupStyles.popupTitle} ${updatedProps.popupTitleClassName}`}>{updatedProps.popupTitle}</p>

          {/* start close button component */}
          <div className={`${PopupStyles.popupCloseBtn} ${isClosable}`} onClick={props.handleShow}>
            <GenericIcon icon={'Close'} size={'md'} iconColour={'cn1'} bgColour={'bs2'} isRounded />
          </div>
          {/* end close button component */}
        </div>


        {/* children specifies all the children that can be passed in the popup */}
        {updatedProps.children}

      </div>
    </Kernel>
  )
}