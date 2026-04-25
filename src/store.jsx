import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AppContext = createContext()

const ADMIN_PASSWORD = 'cho2026'

function load(key, fallback) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback } catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

const DEFAULT_PHOTOS = []

const DEFAULT_MEMORIES = [
  { id: 1, date: '2026-01-15', title: 'Started building the ITDA system', text: 'Finally turning an idea into something real. The architecture is coming together.' },
  { id: 2, date: '2025-11-20', title: 'First hackathon experience', text: 'CTF competition. Didn\'t place, but the problem-solving under pressure was invaluable.' },
  { id: 3, date: '2025-09-01', title: '3rd year begins', text: 'Decided to take this year seriously. No more coasting — intentional effort from here.' },
  { id: 4, date: '2025-06-15', title: 'Semester results: 8.52 GPA', text: 'Consistent effort showing results. Not perfect, but moving in the right direction.' },
  { id: 5, date: '2025-03-10', title: 'Discovered my aesthetic', text: 'Realized I care deeply about how things look and feel. Started curating everything more intentionally.' },
]

const DEFAULT_THOUGHTS = [
  { id: 1, date: '2026-03-20', text: 'Discipline works even when motivation doesn\'t.' },
  { id: 2, date: '2026-02-14', text: 'Consistency is still something I\'m working on. But I show up more days than I don\'t now.' },
  { id: 3, date: '2026-01-28', text: 'Slow progress is still progress.' },
  { id: 4, date: '2025-12-10', text: 'The gap between who I am and who I want to be is where the work happens.' },
  { id: 5, date: '2025-11-05', text: 'Building systems for my life, not just my code.' },
  { id: 6, date: '2025-09-22', text: 'Quiet ambition is still ambition.' },
]

const DEFAULT_NOTES = [
  { id: 1, text: "Reminder: You don't have to have it all figured out. You just have to keep showing up. Carpe diem, always." },
  { id: 2, text: 'Goals for this year: Ship the ITDA project. Improve DSA consistency. Read 12 books. Visit Paris (manifesting). Take better care of myself.' },
  { id: 3, text: 'The person I\'m becoming is worth the discomfort of growth. Keep dancing, keep laughing, keep building.' },
  { id: 4, text: 'Things that make me happy: home-made food, Taylor Swift on full volume, chocolate at midnight, and people who match my effort.' },
  { id: 5, text: "Dear future Cho — I hope you made it to Paris, shipped something you're proud of, and still look up at the stars. Stay soft." },
]

const DEFAULT_FAVORITES = [
  { id: 1, category: 'Series', items: 'Friends · Vampire Diaries · Bridgerton' },
  { id: 2, category: 'Music', items: 'Taylor Swift · Arijit Singh' },
  { id: 3, category: 'Comfort', items: 'Home-made food · Chocolates · Coffee' },
  { id: 4, category: 'Dream', items: 'Paris — someday, definitely' },
  { id: 5, category: 'Love Language', items: "Efforts — show me, don't tell me" },
  { id: 6, category: 'Zodiac', items: 'Aries ♈ — passionate, bold, always right' },
]

const DEFAULT_SONGS = [
  { id: 1, name: 'Tum Hi Ho', artist: 'Arijit Singh' },
  { id: 2, name: 'Channa Mereya', artist: 'Arijit Singh' },
  { id: 3, name: 'Agar Tum Saath Ho', artist: 'Arijit Singh' },
]

export function AppProvider({ children }) {
  const [photos, setPhotos] = useState(() => load('cho_photos', DEFAULT_PHOTOS))
  const [memories, setMemories] = useState(() => load('cho_memories', DEFAULT_MEMORIES))
  const [thoughts, setThoughts] = useState(() => load('cho_thoughts', DEFAULT_THOUGHTS))
  const [privateNotes, setPrivateNotes] = useState(() => load('cho_notes', DEFAULT_NOTES))
  const [favorites, setFavorites] = useState(() => load('cho_favs', DEFAULT_FAVORITES))
  const [songs, setSongs] = useState(() => load('cho_songs', DEFAULT_SONGS))
  const [darkMode, setDarkMode] = useState(() => load('cho_dark', false))
  const [isAdmin, setIsAdmin] = useState(false)

  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  useEffect(() => { save('cho_photos', photos) }, [photos])
  useEffect(() => { save('cho_memories', memories) }, [memories])
  useEffect(() => { save('cho_thoughts', thoughts) }, [thoughts])
  useEffect(() => { save('cho_notes', privateNotes) }, [privateNotes])
  useEffect(() => { save('cho_favs', favorites) }, [favorites])
  useEffect(() => { save('cho_songs', songs) }, [songs])
  useEffect(() => { save('cho_dark', darkMode) }, [darkMode])

  const loginAdmin = useCallback((pw) => {
    if (pw === ADMIN_PASSWORD) { setIsAdmin(true); return true }
    return false
  }, [])
  const logoutAdmin = useCallback(() => setIsAdmin(false), [])

  const addPhoto = useCallback((p) => setPhotos(prev => [{ ...p, id: Date.now() }, ...prev]), [])
  const deletePhoto = useCallback((id) => setPhotos(prev => prev.filter(p => p.id !== id)), [])
  const addMemory = useCallback((m) => setMemories(prev => [{ ...m, id: Date.now() }, ...prev]), [])
  const deleteMemory = useCallback((id) => setMemories(prev => prev.filter(m => m.id !== id)), [])
  const addThought = useCallback((t) => setThoughts(prev => [{ ...t, id: Date.now() }, ...prev]), [])
  const deleteThought = useCallback((id) => setThoughts(prev => prev.filter(t => t.id !== id)), [])
  const addPrivateNote = useCallback((text) => setPrivateNotes(prev => [{ id: Date.now(), text }, ...prev]), [])
  const deletePrivateNote = useCallback((id) => setPrivateNotes(prev => prev.filter(n => n.id !== id)), [])

  const updateFavorite = useCallback((id, items) => setFavorites(prev => prev.map(f => f.id === id ? { ...f, items } : f)), [])
  const addFavorite = useCallback((cat, items) => setFavorites(prev => [...prev, { id: Date.now(), category: cat, items }]), [])
  const deleteFavorite = useCallback((id) => setFavorites(prev => prev.filter(f => f.id !== id)), [])

  const addSong = useCallback((name, artist) => setSongs(prev => [...prev, { id: Date.now(), name, artist }]), [])
  const deleteSong = useCallback((id) => setSongs(prev => prev.filter(s => s.id !== id)), [])

  const filteredPhotos = activeFilter === 'all' ? photos : photos.filter(p => p.tag === activeFilter)

  return (
    <AppContext.Provider value={{
      photos, filteredPhotos, memories, thoughts, favorites, songs,
      selectedPhoto, setSelectedPhoto,
      activeFilter, setActiveFilter,
      showUpload, setShowUpload,
      showAddMemory, setShowAddMemory,
      secretUnlocked, setSecretUnlocked,
      privateNotes, addPrivateNote, deletePrivateNote,
      darkMode, setDarkMode,
      isAdmin, loginAdmin, logoutAdmin,
      addPhoto, deletePhoto,
      addMemory, deleteMemory,
      addThought, deleteThought,
      updateFavorite, addFavorite, deleteFavorite,
      addSong, deleteSong,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
