export type ICONS =
  | 'SendXFill'
  | 'FaCircleCheck'
  | 'AiOutlineInfoCircle'
  | 'RiCheckboxBlankLine'
  | 'IoMdRadioButtonOff'
  | 'GrFormClose'
  | 'BsEnvelope'
  | 'Close'
  | 'LeftChevron'
  | 'RightChevron'
  | 'DownChevron'
  | 'RightArrow'
  | 'BarUp'
  | 'BsArrowDown'
  | 'BsFillCheckSquareFill'
  | 'RiRadioButtonFill'
  | 'Slash'
  | 'Calendar'
  | 'Clock'
  | 'MapPin'
  | 'Play'
  | 'CBlockEntry'
  | 'CInlineEntry'

export type COLOURS =
  | 'inherit'
  | 'cp1'
  | 'cp2'
  | 'cp3'
  | 'cp4'
  | 'cp5'
  | 'cs1'
  | 'cs2'
  | 'cs3'
  | 'cn1'
  | 'cn2'
  | 'cn3'
  | 'cn4'
  | 'cn5'
  | 'cn6'
  | 'cn7'
  | 'cn8'

export type GRADIENTS = 'inherit' | 'cs1s3d' | 'cs1s3h'

export type BGCOLOURS =
  | 'inherit'
  | 'bgTransparent'
  | 'bgTranslucent'
  | 'bgNone'
  | 'bp1'
  | 'bp2'
  | 'bs1'
  | 'bs2'
  | 'bs3'
  | 'bs4'
  | 'bs5'
  | 'bn1'
  | 'bn2'
  | 'bn3'
  | 'bn4'
  | 'bn5'
  | 'bn6'
  | 'bn7'
export type BGGRADIENTS =
  | 'inherit'
  | 'bs1s3d'
  | 'bs1s3h'
  | 'bo1n1d'

export type ORIENTATION = 'portrait' | 'landscape'

export type FONTFAMILIES =
  | 'inherit'
  | 'fSansReg'
  | 'fSansMed'
  | 'fSansBld'
  | 'fSans'
  | 'fSerif'

export type HEADINGS = 'inherit' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type FONTSIZES =
  | HEADINGS
  | 'fMin'
  | 'fSm'
  | 'fMd'
  | 'fLg'
  | 'fXl'
  | 'fMax'

export type SIZES = 'min' | 's' | 'm' | 'l' | 'xl' | 'max'

export type HTMLTEXTTAGS =
  | 'p'
  | 'span'
  | 'em'
  | 'sup'
  | 'sub'
  | 'a'
  | Omit<HEADINGS, 'inherit'>
export type HTMLTAGS = HTMLTEXTTAGS | 'div'

export interface GetDateAndTimeOutputI {
  date: string
  time: string
}

export interface DateTimeFormatOptions {
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long'
  hour12?: boolean
}