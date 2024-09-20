import React, {useContext} from 'react'
import { ThemeContext } from './ThemeContext'

function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <button onClick={toggleTheme}>
            {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </button>
    )
}

export default ThemeSwitcher
