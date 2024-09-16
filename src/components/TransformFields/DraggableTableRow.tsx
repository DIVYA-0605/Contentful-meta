import React from 'react'
import { DragHandle, Flex, Text } from '@contentful/f36-components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { css } from 'emotion'
import { getHelpIcon } from '../../utils'

export function DraggableTableRow({ id, fieldData }: any) {
  const styles = {
    row: css({
      // This lets us change z-index when dragging
      borderBottom: '1px solid #e0e0e0',
      position: 'relative',
      height: 50,
      background: 'white',
    }),
  }
  const { active, attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    })
  const zIndex = active && active.id === id ? 1 : 0
  const style = {
    zIndex,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <Flex alignItems={'center'} className={styles.row} ref={setNodeRef} style={style}>
      <DragHandle
        label='Reorder item'
        variant='transparent'
        {...attributes}
        {...listeners}
      />
      <Text fontWeight='fontWeightMedium'>{fieldData?.name}
        <span style={{ fontStyle: 'italic' }}>{' '}{getHelpIcon(fieldData?.type)}</span></Text>
    </Flex>
  )
}