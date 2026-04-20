import { AppProvider, useApp } from './store'
import FloatingBlobs from './components/FloatingBlobs'
import StarField from './components/StarField'
import ThemeToggle from './components/ThemeToggle'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import PhotoWall from './components/PhotoWall'
import PhotoModal from './components/PhotoModal'
import UploadModal from './components/UploadModal'
import Moodboard from './components/Moodboard'
import MemoryTimeline from './components/MemoryTimeline'
import AddMemoryModal from './components/AddMemoryModal'
import Achievements from './components/Achievements'
import Thoughts from './components/Thoughts'
import SecretSection from './components/SecretSection'
import Contact from './components/Contact'
import { WavyDivider } from './components/WaveDivider'

function AppShell() {
  const { darkMode } = useApp()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`relative min-h-screen transition-colors duration-700 ${darkMode ? 'bg-cosmos text-cosmos-text' : 'bg-base text-slate-dark'}`}>
        {darkMode ? <StarField /> : <FloatingBlobs />}
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <WavyDivider />
          <AboutMe />
          <WavyDivider />
          <PhotoWall />
          <WavyDivider />
          <Moodboard />
          <WavyDivider />
          <MemoryTimeline />
          <WavyDivider />
          <Achievements />
          <WavyDivider />
          <Thoughts />
          <WavyDivider />
          <SecretSection />
          <WavyDivider />
          <Contact />
        </main>
        <PhotoModal />
        <UploadModal />
        <AddMemoryModal />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
