'use client'
import React, { useEffect } from 'react'
import { IconType } from 'react-icons'
import Kernel from '../../Kernel'
import { IconD } from './defaults'
import style from './index.module.scss'
import { IconI } from './interface'
import { injectIconSEO } from './seo'
import { TheIcons } from './utils'

export default function GenericIcon(props: IconI) {


  useEffect(() => {
    injectIconSEO(props)
  })

  let isAsIs = false

  //@ts-ignore
  let iconRootClass = `${style.iconRoot} ${style[props.size]} ${props.bgColour} ${props.htmlAttr?.className}`

  let iconClassName = `${style[`${props.size}Svg`]} ${props.iconColour} ${props.htmlAttr?.className}`

  if (props.isRounded) {
    iconRootClass += ' rounded max'
  }

  if (!props.isAsIs) {
    if (props.bgColour !== 'inherit') {
      iconRootClass += ` ${props.bgColour}`
    }
  } else {
    isAsIs = true
  }

  //getting the icon from the react-icons library from the BasicIcons object
  //@ts-ignore
  const Icon: IconType = TheIcons[props.icon]

  /**
   * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
   * This way we don't need to keep providing the minimum defaults everytime a component is added
   * and plus we don't end up mutating the originally provided props.
   * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
   */

  const updatedProps: IconI = {
    ...IconD,
    ...props,
    htmlAttr: {
      ...props.htmlAttr,
      className: iconRootClass,
    },
    isAsIs: isAsIs,
  }

  return (
    <Kernel {...updatedProps}>
      <Icon className={iconClassName} />
    </Kernel>
  )
}