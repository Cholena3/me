import { useApp } from '../store'

export function WavyDivider() {
  const { darkMode } = useApp()
  return (
    <div className={`max-w-4xl mx-auto my-0 ${darkMode ? 'breathing-line' : 'editorial-line'}`} />
  )
}
