import React, { useState, createContext, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { deepmerge } from '@mui/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import { getDesignTokens, getComponentThemes } from '../theme'

/* Context for providing color mode */
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

/**
 * @param {any} children
 * @returns color mode context provider
 */
export const ColorModeContextProvider = ({ children }) => {
  const MODE = 'mode'
  const systemPreferenceDark = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const [mode, setMode] = useState(localStorage.getItem(MODE) ?? systemPreferenceDark)

  useEffect(() => {
    localStorage.setItem(MODE, mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light'),
      mode
    }),
    [mode]
  )

  const theme = createTheme(deepmerge(getDesignTokens(mode), getComponentThemes(mode)))

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

ColorModeContextProvider.propTypes = {
  children: PropTypes.any
}
