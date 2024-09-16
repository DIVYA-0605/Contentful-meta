import React from 'react'
import '../../globals/styles/styles-lg.scss'
import { KernelD } from './defaults'
import { KernelI } from './interface'

/**
 * Kernel lies at the heart of every UI-component we build. At its core, every UI-component extends and builds upon Kernel.
 * @param {KernelI} props
 * @returns {React.ReactElement}
 * @constructor
 */
export default function Kernel<T extends | keyof JSX.IntrinsicElements | React.JSXElementConstructor<any> = 'div'>(props: KernelI<T>) {

  let K = <></>

  if (props._conf?.status === 'ARCHIVED' || props._conf?.status === 'DISABLED') {
    //if status is archived or disabled then don't render component and show description.
    K = <>This component is <code>{props._conf.status}</code>.</>
  } else if (props.isAsIs) {
    // If the props.isAsIs that means component doesn't need wrapper, we return the children as is.
    K = <>{props.children}</>
  } else {

    let className = `${props.htmlAttr?.className ?? ''}`

    if (!props.isVisible) {
      className += ` hidden`
    }
    if (!props.isPresent) {
      className += ` dNone`
    }
    if (props.isInteractive) {
      className += ` interactive`
    }

    if (props.isImmersive) {
      //@todo
    }
    if (props.isFocusable) {
      //@todo
    }
    if (props.isTrackable) {
      //@todo
    }
    if (props.isBlurred) {
      //@todo
    }
    if (props.isFocused) {
      //@todo
    }
    if (props.isHighlighted) {
      //@todo
    }
    if (props.isHotspot) {
      //@todo
    }
    if (props.isHotspotActive) {
      //@todo
    }
    if (props.isHotspotEnabled) {
      //@todo
    }
    if (props.isVisibleOnSmallScreen) {
      //@todo
    }
    if (props.isVisibleOnLargeScreen) {
      //@todo
    }
    if (props.isEnabled) {
      //@todo
    }
    if (props.theme === 'DARK') {
      //@todo
    }
    //@todo ...implement other behaviours like isBlurred, isHotspot, isVisibleOnSmallScreen, etc. via css

    // If the props.as is defined, we return the children wrapped in the props.as element.
    const Element:
      | keyof JSX.IntrinsicElements
      | React.JSXElementConstructor<any> = props.as ?? 'div'


    /**
     * updatedProps prepends the default values for the props of a component to the custom props provided and serve as the single source of props.
     * This way we don't need to keep providing the minimum defaults everytime a component is added
     * and plus we don't end up mutating the originally provided props.
     * @summary Unless you have a very good reason not to, use updatedProps where ever possible.
     */
    const updatedProps: KernelI<T> = {
      ...(KernelD as KernelI<T>),
      ...props,
      htmlAttr: {
        ...props.htmlAttr,
        className: className,
      },
    }

    K = <Element {...updatedProps.htmlAttr}>{updatedProps.children}</Element>
  }

  return K
}
export { KernelD }
export type { KernelI }