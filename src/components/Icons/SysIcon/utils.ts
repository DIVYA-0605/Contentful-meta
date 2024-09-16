import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowDown, BsArrowRight, BsCalendar3, BsChevronBarUp, BsChevronDown, BsChevronLeft, BsChevronRight, BsClock, BsEnvelope, BsFillCheckSquareFill, BsSendXFill, BsX } from 'react-icons/bs'
import { CiYoutube } from 'react-icons/ci'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoMdRadioButtonOff } from 'react-icons/io'
import { RiCheckboxBlankLine, RiMapPinLine, RiRadioButtonFill } from 'react-icons/ri'
import { RxBox, RxBoxModel, RxSlash } from 'react-icons/rx'

export const TheIcons = {
  SendXFill            : BsSendXFill,
  IoMdRadioButtonOff   : IoMdRadioButtonOff,
  RiCheckboxBlankLine  : RiCheckboxBlankLine,
  FaCircleCheck        : FaCircleCheck,
  AiOutlineInfoCircle  : AiOutlineInfoCircle,
  DownChevron          : BsChevronDown,
  BsEnvelope           : BsEnvelope,
  Close                : BsX,
  LeftChevron          : BsChevronLeft,
  RightChevron         : BsChevronRight,
  RightArrow           : BsArrowRight,
  BarUp                : BsChevronBarUp,
  BsArrowDown          : BsArrowDown,
  BsFillCheckSquareFill: BsFillCheckSquareFill,
  RiRadioButtonFill    : RiRadioButtonFill,
  Slash                : RxSlash,
  Calendar             : BsCalendar3,
  Clock                : BsClock,
  MapPin               : RiMapPinLine,
  Play                 : CiYoutube,
  //contentful only icons
  CInlineEntry: RxBoxModel,
  CBlockEntry : RxBox,
}