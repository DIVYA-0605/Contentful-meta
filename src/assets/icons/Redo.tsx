import React from 'react'
import { Icon } from '@contentful/f36-components'

function Redo(props: any) {
  return (
    <Icon {...props} size={'tiny'}>
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
        <path
          d='M20 7H9.00001C6.23858 7 4 9.23857 4 12C4 14.7614 6.23858 17 9 17H16M20 7L17 4M20 7L17 10'
          stroke='#1C274C'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  )
}

export default Redo