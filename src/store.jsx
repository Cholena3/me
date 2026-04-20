import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

const SAMPLE_PHOTOS = []

const SAMPLE_MEMORIES = [
  { id: 1, date: '2026-01-15', title: 'Started building the ITDA system', text: 'Finally turning an idea into something real. The architecture is coming together.' },
  { id: 2, date: '2025-11-20', title: 'First hackathon experience', text: 'CTF competition. Didn\'t place, but the problem-solving under pressure was invaluable.' },
  { id: 3, date: '2025-09-01', title: '3rd year begins', text: 'Decided to take this year seriously. No more coasting — intentional effort from here.' },
  { id: 4, date: '2025-06-15', title: 'Semester results: 8.52 GPA', text: 'Consistent effort showing results. Not perfect, but moving in the right direction.' },
  { id: 5, date: '2025-03-10', title: 'Discovered my aesthetic', text: 'Realized I care deeply about how things look and feel. Started curating everything more intentionally.' },
]

const SAMPLE_THOUGHTS = [
  { id: 1, date: '2026-03-20', text: 'Discipline works even when motivation doesn\'t.' },
  { id: 2, date: '2026-02-14', text: 'Consistency is still something I\'m working on. But I show up more days than I don\'t now.' },
  { id: 3, date: '2026-01-28', text: 'Slow progress is still progress.' },
  { id: 4, date: '2025-12-10', text: 'The gap between who I am and who I want to be is where the work happens.' },
  { id: 5, date: '2025-11-05', text: 'Building systems for my life, not just my code.' },
  { id: 6, date: '2025-09-22', text: 'Quiet ambition is still ambition.' },
]

export function AppProvider({ children }) {
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS)
  const [memories, setMemories] = useState(SAMPLE_MEMORIES)
  const [thoughts, setThoughts] = useState(SAMPLE_THOUGHTS)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const addPhoto = useCallback((photo) => {
    setPhotos(prev => [{ ...photo, id: Date.now() }, ...prev])
  }, [])

  const addMemory = useCallback((memory) => {
    setMemories(prev => [{ ...memory, id: Date.now() }, ...prev])
  }, [])

  const addThought = useCallback((thought) => {
    setThoughts(prev => [{ ...thought, id: Date.now() }, ...prev])
  }, [])

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.tag === activeFilter)

  return (
    <AppContext.Provider value={{
      photos, filteredPhotos, memories, thoughts,
      selectedPhoto, setSelectedPhoto,
      activeFilter, setActiveFilter,
      showUpload, setShowUpload,
      showAddMemory, setShowAddMemory,
      secretUnlocked, setSecretUnlocked,
      darkMode, setDarkMode,
      addPhoto, addMemory, addThought,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
