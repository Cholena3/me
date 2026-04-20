export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-champagne rounded-full blur-[100px] animate-drift" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-dusty-light/50 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-rose-light/30 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '8s' }} />
    </div>
  )
}
