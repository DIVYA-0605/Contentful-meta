import { IconButton, Tooltip } from '@contentful/f36-components'
import React, { Fragment } from 'react'
import '../Tiptap/styles.scss'
//import ToolTip from '../Tooltip'
import { colorsValues } from './@core/colorsValues'
import SingleColor from './@core/SingleColor'
import styles from './styles/colorInput.module.scss'
import Undo from '../../assets/icons/Undo'
import { GlobalContext } from '../../contexts/globalContext'

const ColorsInput = ({ name, onClick }:
                       {
                         name: string;
                         onClick: ({ name, value }: { name: string; value: string | number }) => void;
                       }) => {

  const { setActiveColor } = React.useContext(GlobalContext)

  function handleReset() {
    if (name === 'Font Color') {
      setActiveColor(prev => {
        return {
          ...prev,
          fontColor: 'black',
        }
      })
    } else {

      setActiveColor(prev => {
        return {
          ...prev,
          highlightColor: null,
        }
      })
    }
  }

  return (
    <div
      style={{
        //display : 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        width: 300,
        margin: '0 20px',
      }}
    >
      <div className={styles.colorSelectionDiv}>
        {/*<ButtonGroup>*/}
        <IconButton
          size={'medium'}
          variant='transparent'
          aria-label='reset'
          icon={<Undo />}
          onClick={handleReset}
        />
        {/*</ButtonGroup>*/}
      </div>
      {colorsValues.map((colors) => (
        <Fragment key={colors.name}>
          <div className={styles.colorRoot}>
            <p className={styles.colorTitle}>{colors.name}</p>
            <div className={styles.colorTiles}>
              {colors.colors.map((color) => (

                <Fragment key={color.hex}>
                  <Tooltip placement='top' content={`${color.name} : ${color.codeName}`}>
                    <div
                      className={styles.singleColorRoot}>
                      <SingleColor
                        name={name}
                        onClick={onClick}
                        value={color.hex}
                      />
                    </div>

                  </Tooltip>
                </Fragment>

              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default ColorsInput