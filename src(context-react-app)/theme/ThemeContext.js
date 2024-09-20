import React, {createContext,useState} from 'react'

// Context 생성
export const ThemeContext = createContext();

// ThemeProvider 컴포넌트
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false) // 기본값은 라이트 모드

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode) // 다크 모드와 라이트 모드를 전환
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}