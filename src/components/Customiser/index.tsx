import { ButtonGroup, Icon, IconButton, Radio } from '@contentful/f36-components'
import { CheckCircleIcon, CloseIcon } from '@contentful/f36-icons'
import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import { PiShootingStarDuotone, PiStarLight } from 'react-icons/pi'
import { GlobalContext } from '../../contexts/globalContext'
import Tag from '../Bubbles/Tag'
import ColorsInput from '../ColorsInput'
import { getSelectedText } from '../Tiptap/utils'
import './index.scss'

const StyleList = [
  {
    category: 'Highlight Color',
    styles: [
      { label: 'Highlight none', class: 'bnone' },
      { label: 'Transparent', class: 'bgTransparent' },
      { label: 'Primary 1', class: 'bp1' },
      { label: 'Primary 2', class: 'bp2' },
      { label: 'Secondary 1', class: 'bs1' },
      { label: 'Secondary 2', class: 'bs2' },
      { label: 'Secondary 3', class: 'bs3' },
      { label: 'Neutral 1', class: 'bn1' },
      { label: 'Neutral 2', class: 'bn2' },
      { label: 'Neutral 3', class: 'bn3' },
      { label: 'Neutral 4', class: 'bn4' },
      { label: 'Neutral 5', class: 'bn5' },
      { label: 'Neutral 6', class: 'bn6' },
    ],
  },
  {
    category: 'Font Color',
    styles: [
      { label: 'Primary 1', class: 'cp1' },
      { label: 'Primary 2', class: 'cp2' },
      { label: 'Primary 3', class: 'cp3' },
      { label: 'Primary 4', class: 'cp4' },
      { label: 'Primary 5', class: 'cp5' },
      { label: 'Secondary 1', class: 'cs1' },
      { label: 'Secondary 2', class: 'cs2' },
      { label: 'Secondary 3', class: 'cs3' },
      { label: 'Neutral 1', class: 'cn1' },
      { label: 'Neutral 2', class: 'cn2' },
      { label: 'Neutral 3', class: 'cn3' },
      { label: 'Neutral 4', class: 'cn4' },
      { label: 'Neutral 5', class: 'cn5' },
      { label: 'Neutral 6', class: 'cn6' },
      { label: 'Neutral 7', class: 'cn7' },
      { label: 'Neutral 8', class: 'cn8' },
    ],
  },
  {
    category: 'Font Sizes',
    styles: [
      { label: 'Font min', class: 'fMin' },
      { label: 'Font small', class: 'fSm' },
      { label: 'Font medium', class: 'fMd' },
      { label: 'Font large', class: 'fLg' },
      { label: 'Font extra large', class: 'fXl' },
      { label: 'Font max', class: 'fMax' },
    ],
  },
  {
    category: 'Font Family',
    styles: [
      { label: 'Serif', class: 'fSerif' },
      { label: 'Sans serif Bold', class: 'fSansBld' },
      { label: 'Sans serif Regular', class: 'fSansReg' },
      { label: 'Sans serif Medium', class: 'fSansMed' },
      { label: 'Sans serif', class: 'fSans' },
    ],
  },
  {
    category: 'Background Color',
    styles: [
      { label: 'Background none', class: 'bgNone' },
      { label: 'Transparent', class: 'bgTransparent' },
      { label: 'Primary 1', class: 'bp1' },
      { label: 'Primary 2', class: 'bp2' },
      { label: 'Secondary 1', class: 'bs1' },
      { label: 'Secondary 2', class: 'bs2' },
      { label: 'Secondary 3', class: 'bs3' },
      { label: 'Secondary 4', class: 'bs4' },
      { label: 'Secondary 5', class: 'bs5' },
      { label: 'Neutral 1', class: 'bn1' },
      { label: 'Neutral 2', class: 'bn2' },
      { label: 'Neutral 3', class: 'bn3' },
      { label: 'Neutral 4', class: 'bn4' },
      { label: 'Neutral 5', class: 'bn5' },
      { label: 'Neutral 6', class: 'bn6' },
      { label: 'Neutral 7', class: 'bn7' },
    ],
  },
  {
    category: 'Gradients',
    styles: [
      { label: 'Gradient s1 s3 diagonal', class: 'bs1s3d' },
      { label: 'Gradient s1 s3 linear', class: 'bs1s3h' },
      { label: 'Gradient o1 s2 diagonal', class: 'bgo1n1d' },
      { label: 'Text gradient s1 s3 diagonal', class: 'cs1s3d' },
      { label: 'Text gradient s1 s3 linear', class: 'cs1s3h' },
    ],
  },
  {
    category: 'Borders',
    styles: [
      { label: 'Border', class: 'bdr solid' },
      { label: 'Border thick', class: 'bdr thick' },
      { label: 'Border dashed', class: 'bdr dashed' },
      { label: 'Border dashed', class: 'bdr transparent' },
      { label: 'Border translucent', class: 'bdr translucent' },
    ],
  },
  {
    category: 'Rounded',
    styles: [
      { label: 'Rounded min', class: 'rounded min' },
      { label: 'Rounded small', class: 'rounded s' },
      { label: 'Rounded medium', class: 'rounded m' },
      { label: 'Rounded large', class: 'rounded l' },
      { label: 'Rounded extra large', class: 'rounded xl' },
      { label: 'Rounded max', class: 'rounded max' },
    ],
  },
  {
    category: 'Heading tags',
    styles: [
      { label: 'Heading 1', class: 'h1' },
      { label: 'Heading 2', class: 'h2' },
      { label: 'Heading 3', class: 'h3' },
      { label: 'Heading 4', class: 'h4' },
      { label: 'Heading 5', class: 'h5' },
      { label: 'Heading 6', class: 'h6' },
      { label: 'Subheading', class: 'subheading' },
    ],
  },
  {
    category: 'Shadow',
    styles: [
      { label: 'Shadow 1', class: 'shadow shadow1' },
      { label: 'Shadow 2', class: 'shadow shadow2' },
      { label: 'Shadow 3', class: 'shadow shadow3' },
    ],
  },
  {
    category: 'Others',
    styles: [
      { label: 'Visibility hidden', class: 'hidden' },
      { label: 'Display none', class: 'dNone' },
    ],
  },
]

const Customiser = () => {

  const [activeCategory, setActiveCategory] = React.useState(StyleList[0].category)
  const [selectedStyles, setSelectedStyles] = React.useState<{ [key: string]: string }>({});
  const { editor } = useCurrentEditor()
  const { isStylingModalOpen, setIsStylingModalOpen } = React.useContext(GlobalContext)
  const { activeColor, setActiveColor } = React.useContext(GlobalContext)

  function handleStyleChange(category: string, item: { label: string, class: string }) {
    setSelectedStyles(prev => ({
      ...prev,
      [category]: item.class
    }));
  }

  function removeStyle(className: string) {
    setSelectedStyles(prev => {
      const updatedSelectedStyles = { ...prev };
      // Iterate over the entries and remove the style with the specified className
      for (const [category, selectedStyle] of Object.entries(updatedSelectedStyles)) {
        if (selectedStyle === className) {
          delete updatedSelectedStyles[category];
          break; // Stop after the first match is found
        }
      }
      return updatedSelectedStyles;
    });
  }

  function handleApply() {
    const styleClasses = Object.values(selectedStyles).join(' ');

    if (activeColor.highlightColor !== null) {
      editor?.commands.setHighlight({ color: activeColor.highlightColor });
    } else {
      editor?.commands.unsetHighlight();
    }

    if (activeColor.fontColor !== 'black') {
      editor?.commands.setColor(activeColor.fontColor);
    } else {
      editor?.commands.unsetColor();
    }

    editor?.chain().focus().setAltusText({ class: styleClasses }).run();

    if (activeCategory === 'Bg Color') {
      if (styleClasses.length > 0) {
        editor?.chain().focus().setAltusDiv({ class: styleClasses }).run();
      } else {
        editor?.chain().focus().unsetAltusDiv().run();
      }
    }

    setIsStylingModalOpen(false);
  }

  function handleColorClick({ name, value }: { name: string, value: string | number }) {
    if (name === 'Highlight Color') {
      setActiveColor(prev => {
        return {
          ...prev,
          highlightColor: value.toString(),
        }
      })

    }
    else {
      setActiveColor(prev => {
        return {
          ...prev,
          fontColor: value.toString(),
        }
      })
    }
  }

  const SubCategory = <div className={'subCategoryRoot'}>
    <h6 className={'categoryHeading'}>Sub category</h6>
    <div className={'subCategoryInner'}>
      {StyleList.find(item => item.category === activeCategory)?.styles.map((item, index) => (
        <Radio
          key={index}
          isChecked={selectedStyles[activeCategory] === item.class}
          onClick={() => handleStyleChange(activeCategory, item)}>
          {item.label}
        </Radio>
      ))}
    </div>
  </div>

  return <div className={'customiserRoot'}>

    <div className={'customiserInnerRoot'}>

      <aside>
        <div className={'asideTopDiv'}>
          {/*<div className={'searchRoot'}>*/}
          {/*  <TextInput*/}
          {/*    icon={<SearchIcon />}*/}
          {/*    size='small'*/}
          {/*    placeholder='Search here...'*/}
          {/*  />*/}
          {/*</div>*/}

          <div className={'stylingRoot'}>
            <ButtonGroup variant='spaced' spacing='spacingM'>
              <IconButton
                variant='secondary'
                size='small'
                aria-label='Transition'
                icon={<Icon as={PiStarLight} />}
              />
              <IconButton
                variant='secondary'
                size='small'
                aria-label='Animation'
                icon={<Icon as={PiShootingStarDuotone} />}
              />
            </ButtonGroup>
          </div>
        </div>

        <hr />

        <div className={'listRoot'}>
          <div className={'categoryRoot'}>
            <h6 className={'categoryHeading'}>Category</h6>
            <ul>
              {
                StyleList.map((item, index) => {
                  return <li key={index} onClick={() => setActiveCategory(item.category)}
                    className={`${activeCategory === item.category ? 'active' : ''} pointer`}>
                    {item.category}
                  </li>
                })
              }
            </ul>
          </div>

          {/* <div className={'resizer'}></div> */}
          <hr />

          {activeCategory === 'Highlight Color' || activeCategory === 'Font Color' ?
            <ColorsInput name={activeCategory} onClick={handleColorClick} />
            : SubCategory}

          {/* <div className={'tagsRoot'}>
            {
              classList.map((item, index) => {
                return <Tag key={index} variant={'secondary'} isIcon={true} size={'small'} text={item} onRemove={
                  () => removeStyle(item)
                } />
              })
            }
          </div> */}
          <div className={'tagsRoot'}>
            {Object.entries(selectedStyles).map(([category, selectedStyle]) => (
              <Tag
                key={category}
                variant={'secondary'}
                isIcon={true}
                size={'small'}
                text={selectedStyle}
                onRemove={() => removeStyle(selectedStyle)}
              />
            ))}
          </div>

        </div>

      </aside>

      <main>

      <div className={'previewRoot'}>
        <span
          className={Object.values(selectedStyles).join(' ')}
          style={{
            color: activeColor.fontColor,
            backgroundColor: activeColor.highlightColor || 'transparent',
          }}
        >
          {getSelectedText(editor) || 'Please select text'}
        </span>
      </div>

        <footer>
          <div className={'footerInner'}>
            <ButtonGroup>
              <IconButton
                onClick={() => setIsStylingModalOpen(false)}
                size={'large'}
                variant='transparent'
                aria-label='cancel'
                icon={<CloseIcon />}
              />
              <IconButton
                onClick={handleApply}
                size={'large'}
                variant='transparent'
                aria-label='cancel'
                icon={<CheckCircleIcon />}
              />
            </ButtonGroup>
          </div>
        </footer>
      </main>

      <div>

      </div>
    </div>

  </div>
}

export default Customiser