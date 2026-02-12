//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

addFilter('formatNumber', number => {
  return Number(number).toLocaleString('en-GB')
})

addFilter('formatDate', dateString => {
  if (!dateString) return ''
  
  let date
  
  // Handle dd/mm/yyyy format
  if (dateString.includes('/')) {
    const parts = dateString.split('/')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1 // Month is 0-indexed
      const year = parseInt(parts[2], 10)
      date = new Date(year, month, day)
    } else {
      return dateString
    }
  } else {
    // Try parsing as ISO format
    date = new Date(dateString)
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString
  }
  
  // Format as 'D MMMM YYYY' (e.g., '6 February 2026')
  const day = date.getDate()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  
  return `${day} ${month} ${year}`
})