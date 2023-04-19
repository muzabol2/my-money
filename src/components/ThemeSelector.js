import modeIcon from '../assets/mode-icon.svg'
import { useThemeContext } from "../hooks/useThemeContext"

export default function ThemeSelector() {
  const { changeMode, mode } = useThemeContext()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <img
      onClick={toggleMode}
      src={modeIcon}
      style={{ filter: mode === 'dark' ? 'invert(60%)' : 'invert(20%)', cursor: 'pointer' }}
      alt="dark/light toggle icon"
      height={24}
      width={24}
    />
  )
  
}