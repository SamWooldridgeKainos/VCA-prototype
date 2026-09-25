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

// Convert "SURNAME, Firstname" to "Firstname Surname" with proper capitalisation
addFilter('formatName', name => {
  if (!name) return ''
  const toTitleCase = str => str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase())
  const parts = name.split(',')
  if (parts.length === 2) {
    const surname = toTitleCase(parts[0].trim())
    const firstName = toTitleCase(parts[1].trim())
    return `${firstName} ${surname}`
  }
  return toTitleCase(name.trim())
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
  
  // Format as 'Day, D MMMM YYYY' (e.g., 'Thursday, 26 February 2026')
  const dayOfMonth = date.getDate()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayOfWeek = dayNames[date.getDay()]
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`
})

// Add N days to a dd/mm/yyyy date and return dd/mm/yyyy. Pipe to formatDate for display.
addFilter('addDays', (dateString, days) => {
  if (!dateString || !dateString.includes('/')) return dateString
  const parts = dateString.split('/')
  if (parts.length !== 3) return dateString
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  const date = new Date(year, month, day)
  if (isNaN(date.getTime())) return dateString
  date.setDate(date.getDate() + Number(days || 0))
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
})

addFilter('ageFromDob', dobString => {
  if (!dobString) return ''
  const parts = dobString.split('/')
  if (parts.length !== 3) return ''
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  const dob = new Date(year, month, day)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
})

addFilter('nextWorkingDay', () => {
  const today = new Date()
  const next = new Date(today)
  next.setDate(next.getDate() + 1)
  // Skip weekends: Saturday (6) -> Monday, Sunday (0) -> Monday
  while (next.getDay() === 0 || next.getDay() === 6) {
    next.setDate(next.getDate() + 1)
  }
  const dd = String(next.getDate()).padStart(2, '0')
  const mm = String(next.getMonth() + 1).padStart(2, '0')
  const yyyy = next.getFullYear()
  return `${dd}/${mm}/${yyyy}`
})

// Order VCL decision cards with the most recent activity first. Ties on the
// activity date (intraday) fall back to the order they were logged, most
// recently logged first.
addFilter('sortVclDecisions', decisions => {
  if (!Array.isArray(decisions)) return []
  return decisions.slice().sort((a, b) => {
    const dateA = a.sortDate || ''
    const dateB = b.sortDate || ''
    if (dateA !== dateB) return dateB.localeCompare(dateA)
    return (b.loggedAt || 0) - (a.loggedAt || 0)
  })
})

// Order charging decision (pcd) cards with the most recent activity first.
// Ties on the activity date fall back to the order they were logged, most
// recently logged first. Mirrors sortVclDecisions.
addFilter('sortPcdDecisions', decisions => {
  if (!Array.isArray(decisions)) return []
  return decisions.slice().sort((a, b) => {
    const dateA = a.sortDate || ''
    const dateB = b.sortDate || ''
    if (dateA !== dateB) return dateB.localeCompare(dateA)
    return (b.loggedAt || 0) - (a.loggedAt || 0)
  })
})

// Map a meetingPurpose code to its display label. Pass meetingPurposeDetails as
// the second argument so "other" resolves to the free-text description.
addFilter('meetingPurposeLabel', (purpose, details) => {
  const labels = {
    'pre-trial': 'CPS pre-trial meeting',
    'pre-charge': 'Pre-charge meeting',
    'charging-decision': 'Inform victim about charging decision',
    'charging-decision-family': 'Inform bereaved family about charging decision',
    'conviction': 'Conviction meeting',
    'sentencing': 'Sentencing meeting',
    'acquittal': 'Acquittal meeting',
    'stopped-altered': 'Stopped or substantially altered charge (VCL Scheme)',
    'vrr': "Victims' Right to Review (VRR)",
    'joint': 'Joint CPS and Police meeting',
    'lesser-offence': 'Lesser offence meeting',
    'complaint': 'Bereaved family complaint',
    'other': details || 'Other'
  }
  return labels[purpose] || 'CPS pre-trial meeting'
})