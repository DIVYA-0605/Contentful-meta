import { EditorAppSDK } from '@contentful/app-sdk'
import { Button, Flex, Menu, ToggleButton, Tooltip } from '@contentful/f36-components'
import {
  ChevronDownIcon,
  EmbeddedEntryBlockIcon,
  EmbeddedEntryInlineIcon,
  FaceHappyIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  LinkTrimmedIcon,
  ListBulletedIcon,
  ListNumberedIcon,
  MinusIcon,
  TableIcon,
} from '@contentful/f36-icons'
import tokens from '@contentful/f36-tokens'
import { useSDK } from '@contentful/react-apps-toolkit'
import { useCurrentEditor } from '@tiptap/react'
import { css } from 'emotion'
import React from 'react'
import CenterAlign from '../../assets/icons/CenterAlign'
import LeftAlign from '../../assets/icons/LeftAlign'
import Redo from '../../assets/icons/Redo'
import RightAlign from '../../assets/icons/RightAlign'
import Undo from '../../assets/icons/Undo'
import { GlobalContext } from '../../contexts/globalContext'
import { addEntry } from './utils'

export const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false)
  const {
    setIsHyperLinkModalOpen,
    setIsStylingModalOpen,
  } = React.useContext(GlobalContext)
  const { activeColor } = React.useContext(GlobalContext)

  const sdk = useSDK<EditorAppSDK>()

  if (!editor) {
    return null
  }

  const styles = {
    editorToolbarContainer: css({
      position: 'relative',
      backgroundColor: tokens.gray200,
      borderRadius: tokens.borderRadiusMedium,
    }),
  }

  function handleHeadingChange(level: any) {
    editor?.chain().focus().setHeading({ level }).run()
  }

  function handleHyperLink() {
    setIsHyperLinkModalOpen(true)

  }

  return (
    <Flex
      className={`${styles.editorToolbarContainer} tiptap-menu `}
      padding='spacingXs'>

      <div className={'left-menu'}>
        <div className={'button-group'}>
          <Tooltip placement='top' content='Undo'>
            <ToggleButton
              isActive={editor.isActive('undo')}
              icon={<Undo />}
              size='small'
              isDisabled={!editor.can().chain().focus().undo().run()}
              onToggle={() => {
                editor.chain().focus().undo().run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' content='Redo'>
            <ToggleButton
              isActive={editor.isActive('redo')}
              icon={<Redo />}
              size='small'
              isDisabled={!editor.can().chain().focus().redo().run()}
              onToggle={() => {
                editor.chain().focus().redo().run()
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div className={'center-menu1'}>
        <Tooltip placement='top' id='Animation' content='Advanced styling & effects'>
          <ToggleButton
            isActive={editor.isActive('altusText')}
            // @todo might swap smile icon with PiShootingStarFill react icon
            icon={<FaceHappyIcon />}
            aria-label='Advanced styling & effects'
            size='small'
            isDisabled={false}
            onToggle={() => {
              setIsStylingModalOpen(true)
            }}
          />
        </Tooltip>

        <Menu>
          <Menu.Trigger>
            <Button
              size='medium'
              variant='secondary'
              endIcon={<ChevronDownIcon />}
            >
              {editor.isActive('paragraph') && 'p '}
              {
                [...Array(6)].map((_, i) => {
                  if (editor.isActive('heading', { level: i + 1 })) {
                    return `h${i + 1}`
                  }
                })
              }
            </Button>
          </Menu.Trigger>
          <Menu.List>
            <Menu.Item onClick={() => {
              editor.chain().focus().setParagraph().run()
            }}>p</Menu.Item>
            {
              [...Array(6)].map((_, i) =>
                <Menu.Item onClick={() => handleHeadingChange(i + 1)}>
                  h{i + 1}
                </Menu.Item>,
              )
            }
          </Menu.List>
        </Menu>


      </div>

      {/* color start */}

      {/* color end */}

      <div className={'center-menu2'}>

        {/*<Popover isOpen={isColorPickerOpen} onClose={() => {*/}
        {/*  setIsColorPickerOpen(false)*/}
        {/*}}>*/}
        {/*  <Popover.Trigger>*/}
        {/*    <div onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} className={'colorSelectionRoot'}>*/}
        {/*      <div className={'backgroundColorDiv'} style={{*/}
        {/*        backgroundColor: activeColor.highlightColor ?? 'transparent',*/}
        {/*      }}></div>*/}
        {/*      <div className={'fontColorDiv'} style={{*/}
        {/*        backgroundColor: activeColor.fontColor,*/}
        {/*      }}></div>*/}
        {/*    </div>*/}
        {/*  </Popover.Trigger>*/}
        {/*  <Popover.Content>*/}
        {/*  */}
        {/*  </Popover.Content>*/}
        {/*</Popover>*/}

        <div className={'button-group'}>
          <Tooltip placement='top' id='Bold' content='Bold'>
            <ToggleButton
              isActive={editor.isActive('bold')}
              icon={<FormatBoldIcon />}
              aria-label='Bold'
              size='small'
              isDisabled={!editor.can().chain().focus().toggleBold().run()}
              onToggle={() => {
                editor.chain().focus().toggleBold().run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' id='italic' content='Italic'>
            <ToggleButton
              isActive={editor.isActive('italic')}
              icon={<FormatItalicIcon />}
              aria-label='Italic'
              size='small'
              isDisabled={!editor.can().chain().focus().toggleItalic().run()}
              onToggle={() => {
                editor.chain().focus().toggleItalic().run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' id='underline' content='Underline'>
            <ToggleButton
              isActive={editor.isActive('underline')}
              icon={<FormatUnderlinedIcon />}
              aria-label='Underline'
              size='small'
              isDisabled={!editor.can().chain().focus().toggleUnderline().run()}
              onToggle={() => {
                editor.chain().focus().toggleUnderline().run()
              }}
            />
          </Tooltip>
        </div>


        <div className={'button-group'}>
          <Tooltip placement='top' content='Align left'>
            <ToggleButton
              isActive={editor.isActive({ textAlign: 'left' })}
              icon={<LeftAlign />}
              size='small'
              isDisabled={!editor.can().chain().focus().setTextAlign('left').run()}
              onToggle={() => {
                editor.chain().focus().setTextAlign('left').run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' content='Align center'>
            <ToggleButton
              isActive={editor.isActive({ textAlign: 'center' })}
              icon={<CenterAlign />}
              size='small'
              isDisabled={!editor.can().chain().focus().setTextAlign('center').run()}
              onToggle={() => {
                editor.chain().focus().setTextAlign('center').run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' content='Align right'>
            <ToggleButton
              isActive={editor.isActive({ textAlign: 'right' })}
              icon={<RightAlign />}
              size='small'
              isDisabled={!editor.can().chain().focus().setTextAlign('right').run()}
              onToggle={() => {
                editor.chain().focus().setTextAlign('right').run()
              }}
            />
          </Tooltip>
        </div>


        {/* <Tooltip placement='top' id='strike' content='strike'> */}
        {/*   <ToggleButton */}
        {/*     isActive={editor.isActive('strike')} */}
        {/*     icon={<Strikethrough />} */}
        {/*     size='small' */}
        {/*     isDisabled={!editor.can().chain().focus().toggleStrike().run()} */}
        {/*     onToggle={() => { */}
        {/*       editor.chain().focus().toggleStrike().run() */}
        {/*     }} */}
        {/*   /> */}
        {/* </Tooltip> */}


        <div className={'button-group'}>
          <Tooltip placement='top' id='bulletList' content='Bulleted list'>
            <ToggleButton
              isActive={editor.isActive('bulletList')}
              icon={<ListBulletedIcon />}
              aria-label='bulletList'
              size='small'
              // isDisabled={!editor.can().chain().focus().toggleStrike().run()}
              onToggle={() => {
                editor.chain().focus().toggleBulletList().run()
              }}
            />
          </Tooltip>
          <Tooltip placement='top' id='orderedList' content='Numbered list'>
            <ToggleButton
              isActive={editor.isActive('orderedList')}
              icon={<ListNumberedIcon />}
              aria-label='orderedList'
              size='small'
              onToggle={() => {
                editor.chain().focus().toggleOrderedList().run()
              }}
            />
          </Tooltip>
        </div>

        <Tooltip placement='top' id='table' content='Table'>
          <ToggleButton
            icon={<TableIcon />}
            size='small'
            isDisabled={!editor.can().insertTable()}
            onToggle={() => {
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }}
          />
        </Tooltip>


        {/* <button
         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
         className={editor.isActive("codeBlock") ? "is-active" : ""}
         >
         code block
         </button> */}
        {/* <Tooltip placement='top' id='blockquote' content='blockquote'> */}
        {/*   <ToggleButton */}
        {/*     isActive={editor.isActive('blockquote')} */}
        {/*     icon={<QuoteIcon />} */}
        {/*     aria-label='blockquote' */}
        {/*     size='small' */}
        {/*     onToggle={() => { */}
        {/*       editor.chain().focus().toggleBlockquote().run() */}
        {/*     }} */}
        {/*   /> */}
        {/* </Tooltip> */}

        <Tooltip placement='top' id='horizontalrule' content='Divider'>
          <ToggleButton
            isActive={editor.isActive('horizontalrule')}
            icon={<MinusIcon />}
            aria-label='horizontalrule'
            size='small'
            onToggle={() => {
              editor.chain().focus().setHorizontalRule().run()
            }}
          />
        </Tooltip>
      </div>

      <div className={'right-menu'}>
        <Tooltip placement='top' id='hyperlink' content='Link'>
          <ToggleButton
            isActive={editor.isActive('link')}
            icon={<LinkTrimmedIcon />}
            size='small'
            // isDisabled={!editor.isActive('link')}
            onToggle={() => {
              handleHyperLink()
            }}
          />
        </Tooltip>

        <Tooltip placement='top' content='Inline Entry'>
          <ToggleButton
            isActive={false}
            icon={<EmbeddedEntryInlineIcon />}
            size='small'
            // isDisabled={!editor.isActive('link')}
            onToggle={() => {
              addEntry(false, editor, sdk)
            }}
          />
        </Tooltip>

        <Tooltip placement='top' content='Block Entry'>
          <ToggleButton
            isActive={false}
            icon={<EmbeddedEntryBlockIcon />}
            size='small'
            // isDisabled={!editor.isActive('link')}
            onToggle={() => {
              addEntry(true, editor, sdk)
            }}
          />
        </Tooltip>
      </div>
    </Flex>
  )
}