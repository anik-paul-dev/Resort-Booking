import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({
    name: 'Asian Resort',
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico',
    contact: {
      email: 'info@asianresort.com',
      phone: '+62 123 456 7890',
      address: '123 Paradise Beach, Bali, Indonesia'
    },
    social: {
      facebook: 'https://facebook.com/asianresort',
      twitter: 'https://twitter.com/asianresort',
      instagram: 'https://instagram.com/asianresort',
      youtube: 'https://youtube.com/asianresort'
    },
    booking: {
      enabled: true,
      message: ''
    }
  })

  return (
    <AppContext.Provider value={{ siteSettings, setSiteSettings }}>
      {children}
    </AppContext.Provider>
  )
}