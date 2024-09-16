import { DateTimeFormatOptions, GetDateAndTimeOutputI } from './types'

/**
 * Add a node to the HTML Head tag
 * @param {Node} node - The node to be added to the head tag.
 */
export const add2Head = (node: Node) => {
  // Find the HTML head element in the document
  const head = document.querySelector('head') as HTMLHeadElement

  // Append the given node to the head element
  head.appendChild(node)
}

/**
 * Inject SEO data into the document using a JSON object.
 * @param {object} seoJsonData - The SEO data in JSON format to be injected.
 */
export const injectSEO = (seoJsonData: object) => {
  // Create a new script element
  const script = document.createElement('script')

  // Set the script type to 'application/ld+json' (JSON-LD for SEO)
  script.type = 'application/ld+json'

  // Convert the SEO data object to a JSON string and set it as the script's content
  script.innerHTML = JSON.stringify(seoJsonData)

  // Add the script element to the head tag using the 'add2Head' function
  add2Head(script)
}

/**
 * Check if the code is running in a browser environment.
 * @returns {boolean} - Returns true if the code is running in a browser, false otherwise.
 */
export const isBrowser = () => typeof window !== 'undefined'

/**
 * Scroll the window to the top of the page.
 */
export const scrollToTop = () => {
  // Scroll the window to the top (x=0, y=0)
  window.scrollTo(0, 0)
}

export function registerScrollEvent() {
  // on dom ready add event listner update page progress on scroll
  window.onscroll = function() {
    // calculate scroll percentage
    const scrollPercentage =
      (document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
      100
    console.log('scrollPercentage', scrollPercentage)
    // dispatch scroll percentage to redux store
    // store.dispatch(setPageScroll(scrollPercentage))
  }
}

/**
 * Function to truncate the description to a specified word limit
 * @param text Specify the text that needs to be truncated.
 * @param limit Specify the number of words to which the text needs to be shortend
 * @param showEllipsis Specify whether and elipses should be shown at the end of truncated text.
 */
export function truncateText(
  text: string,
  limit: number,
  showEllipsis?: boolean,
): string {
  let updatedText = text
  const words = text.split(' ')
  if (words.length > limit) {
    const ellipsis = showEllipsis === true ? '...' : ''
    updatedText = words.slice(0, limit).join(' ') + ellipsis
  }
  return updatedText
}

/**
 * Function to Get Time, Date and Timezone.
 * @param start this will take start date or time in string (e.g "2023-10-19T00:00:00.000Z" OR "2023-10-10T10:00:00.000+05:30")
 * @param end this will take end date or time in string
 */

export const getDateAndTime = (
  start: string,
  end: string | null,
): GetDateAndTimeOutputI => {
  // converting strings into Date type
  const startDateAndTime = new Date(start)
  const endDateAndTime = end !== null ? new Date(end) : ''

  // options related to Time, Date and TimeZone
  const dateOption: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const timeOptions: DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  // Code below converts date into these format
  // Date format is MMM/DD/YYYY =  Sep 30, 2023
  // If event duration extends more than 1 day, date format is Sep 29 - 30, 2023

  const startDate = startDateAndTime.toLocaleDateString('en-US', {
    ...dateOption,
    year: !endDateAndTime ? 'numeric' : undefined,
  })
  const endDate = endDateAndTime
    ? endDateAndTime.toLocaleDateString('en-US', {
      ...dateOption,
    })
    : null

  // Code below converts time into these format
  // Time format is HH:MM AM/PM =  04:30 AM
  // If event time contains Start and End time, time format is 9:00 - 5:00 PM

  const startTime = startDateAndTime.toLocaleTimeString('en-US', timeOptions)
  const endTime = endDateAndTime
    ? endDateAndTime.toLocaleTimeString('en-US', timeOptions)
    : null

  // Code below return Timezone in string type
  const timeZoneAbbreviation = (
    Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(startDateAndTime)
      .find((part) => part.type === 'timeZoneName') || {}
  ).value

  const Result = {
    date: ` ${startDate} ${endDate !== null ? '- ' + endDate : ''}`,
    time: ` ${endTime !== null ? startTime.split(' ')[0] : startTime} ${
      endTime !== null ? '- ' + endTime : ''
    } `,
    timeZone: timeZoneAbbreviation,
  }
  return Result
}