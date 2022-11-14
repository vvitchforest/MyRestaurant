import React, { useState, createContext, useMemo, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { deepmerge } from '@mui/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import { getDesignTokens, getThemedComponents } from '../theme'

export const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

// eslint-disable-next-line react/prop-types
export const ColorModeContextProvider = ({ children }) => {
  const MODE = 'mode'
  const systemPreference = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const [mode, setMode] = useState(localStorage.getItem(MODE) ?? systemPreference)

  useEffect(() => {
    localStorage.setItem(MODE, mode)
  }, [mode])

  console.log('current mode?', mode)
  console.log('system prefers dark mode?', systemPreference)

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light'),
      mode
    }),
    [mode]
  )

  const theme = createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode)))

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
