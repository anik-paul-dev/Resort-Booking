// Validate required field
export const validateRequired = (value) => {
  if (!value) {
    return 'This field is required'
  }
  return null
}

// Validate email
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required'
  }
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email)) {
    return 'Please enter a valid email address'
  }
  
  return null
}

// Validate password
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required'
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  
  return null
}

// Validate confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  
  return null
}

// Validate name
export const validateName = (name) => {
  if (!name) {
    return 'Name is required'
  }
  
  if (name.length < 3) {
    return 'Name must be at least 3 characters'
  }
  
  return null
}

// Validate phone number
export const validatePhone = (phone) => {
  if (!phone) {
    return 'Phone number is required'
  }
  
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  if (!re.test(phone)) {
    return 'Please enter a valid phone number'
  }
  
  return null
}

// Validate number
export const validateNumber = (value, min, max) => {
  if (!value && value !== 0) {
    return 'This field is required'
  }
  
  const num = Number(value)
  
  if (isNaN(num)) {
    return 'Please enter a valid number'
  }
  
  if (min !== undefined && num < min) {
    return `Value must be at least ${min}`
  }
  
  if (max !== undefined && num > max) {
    return `Value must be at most ${max}`
  }
  
  return null
}

// Validate date
export const validateDate = (date, minDate, maxDate) => {
  if (!date) {
    return 'Date is required'
  }
  
  const inputDate = new Date(date)
  
  if (isNaN(inputDate.getTime())) {
    return 'Please enter a valid date'
  }
  
  if (minDate) {
    const min = new Date(minDate)
    if (inputDate < min) {
      return `Date must be on or after ${min.toLocaleDateString()}`
    }
  }
  
  if (maxDate) {
    const max = new Date(maxDate)
    if (inputDate > max) {
      return `Date must be on or before ${max.toLocaleDateString()}`
    }
  }
  
  return null
}

// Validate date range
export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 'Both start and end dates are required'
  }
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Please enter valid dates'
  }
  
  if (start >= end) {
    return 'End date must be after start date'
  }
  
  return null
}

// Validate file
export const validateFile = (file, maxSize, allowedTypes) => {
  if (!file) {
    return 'Please select a file'
  }
  
  if (maxSize && file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`
  }
  
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return 'File type is not allowed'
  }
  
  return null
}

// Validate URL
export const validateURL = (url) => {
  if (!url) {
    return 'URL is required'
  }
  
  try {
    new URL(url)
    return null
  } catch (e) {
    return 'Please enter a valid URL'
  }
}