import { useCallback, useEffect, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const LOGO = `${BASE}logo.png`

const PHOTOS = [
  2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2418, 2419,
  2420, 2421, 2422, 2423, 2424, 2425, 2426,
].map((n, i) => ({
  src: `${BASE}gallery/IMG_${n}.jpg`,
  alt: `A.I. The Shooter Photo ${i + 1}`,
}))

const VIDEOS = [
  { id: 'JOWsS5RJvOg', title: 'ai the shooter (N.i.K.E)' },
  { id: 'peTp4HLdsQA', title: 'family ties aka My 1st Song by ai the shooter' },
]

const TOP_TRACKS = [
  { rank: 1, title: 'Family Ties', plays: '348K' },
  { rank: 2, title: 'N.I.K.E', plays: '55.5K' },
  { rank: 3, title: 'FYF', plays: '31.1K' },
]

const ICON = (name) =>
  `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${name}.svg`

const SOCIALS = [
  { label: 'YouTube', handle: '@aifreestylefrenzy9070', href: 'https://www.youtube.com/@aifreestylefrenzy9070', icon: ICON('youtube') },
  { label: 'Instagram', handle: '@ai_wayfly', href: 'https://www.instagram.com/ai_wayfly/', icon: ICON('instagram') },
  { label: 'Facebook', handle: 'ai.realpage', href: 'https://www.facebook.com/ai.realpage', icon: ICON('facebook') },
  { label: 'SoundCloud', handle: 'A.I. The Shooter', href: 'https://soundcloud.com/user-763606298-8495026', icon: ICON('soundcloud') },
  { label: 'Slaps', handle: 'Aitheshooter', href: 'https://slaps.com/user/Aitheshooter', icon: null },
]

const NAV = [
  { label: 'Music', href: '#music' },
  { label: 'Videos', href: '#videos' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Follow', href: '#follow' },
]

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <img src={LOGO} alt="A.I. The Shooter Logo" />
        <span>A.I. THE SHOOTER</span>
      </a>
      <button
        className="menu-button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '✕' : '☰'}
      </button>
      <nav className={`site-nav${open ? ' open' : ''}`}>
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-logo" src={LOGO} alt="A.I. The Shooter Logo" />
      <h1>A.I. THE SHOOTER</h1>
      <p className="tagline">RAPPER&nbsp;&nbsp;|&nbsp;&nbsp;ARTIST&nbsp;&nbsp;|&nbsp;&nbsp;CREATOR</p>
      <div className="hero-actions">
        <a className="btn" href="#music">Listen Now</a>
        <a className="btn btn-ghost" href="#videos">Watch</a>
      </div>
    </section>
  )
}

function Music() {
  const player =
    'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-763606298-8495026' +
    '&color=%23f59e0b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
  return (
    <section className="section" id="music">
      <h2>Music</h2>
      <p className="section-sub">Listen to my latest tracks on SoundCloud</p>
      <div className="player-frame">
        <iframe
          title="A.I. The Shooter on SoundCloud"
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={player}
        />
      </div>
      <div className="top-tracks">
        <h3>Top Tracks</h3>
        <ol>
          {TOP_TRACKS.map((t) => (
            <li key={t.rank}>
              <span className="rank">{t.rank}</span>
              <span className="track-title">{t.title}</span>
              <span className="plays">{t.plays} plays</span>
            </li>
          ))}
        </ol>
        <p className="fineprint">Play counts from SoundCloud · November 2026</p>
      </div>
    </section>
  )
}

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  return (
    <figure className="video-card">
      {playing ? (
        <div className="video-frame">
          <iframe
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            loading="lazy"
          />
          <span className="play-badge">▶</span>
        </button>
      )}
      <figcaption>{video.title}</figcaption>
    </figure>
  )
}

function Videos() {
  return (
    <section className="section" id="videos">
      <h2>Videos</h2>
      <div className="video-grid">
        {VIDEOS.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const [index, setIndex] = useState(null)
  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)),
    []
  )
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, close, step])

  return (
    <section className="section" id="gallery">
      <h2>Gallery</h2>
      <p className="section-sub">Exclusive Behind-The-Scenes &amp; Shots</p>
      <div className="gallery-grid">
        {PHOTOS.map((p, i) => (
          <button key={p.src} className="gallery-item" onClick={() => setIndex(i)}>
            <img src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" aria-label="Close" onClick={close}>✕</button>
          <button
            className="lightbox-prev"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); step(-1) }}
          >‹</button>
          <img
            src={PHOTOS[index].src}
            alt={PHOTOS[index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-next"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); step(1) }}
          >›</button>
          <span className="lightbox-count">{index + 1} / {PHOTOS.length}</span>
        </div>
      )}
    </section>
  )
}

function Follow() {
  const [copied, setCopied] = useState(false)
  const copySnap = async () => {
    try {
      await navigator.clipboard.writeText('aistayfresh')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <section className="section" id="follow">
      <h2>Follow</h2>
      <div className="social-grid">
        {SOCIALS.map((s) => (
          <a key={s.label} className="social-card" href={s.href} target="_blank" rel="noreferrer">
            {s.icon && <img src={s.icon} alt="" aria-hidden="true" />}
            <span className="social-label">{s.label}</span>
            <span className="social-handle">{s.handle}</span>
          </a>
        ))}
        <div className="social-card">
          <img src={ICON('snapchat')} alt="" aria-hidden="true" />
          <span className="social-label">Snapchat</span>
          <span className="social-handle">@aistayfresh</span>
          <button className="btn btn-small" onClick={copySnap}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <img src={LOGO} alt="A.I. The Shooter Logo" />
      <p className="footer-name">A.I. THE SHOOTER</p>
      <nav className="footer-links">
        <a href="https://103-software-solutions-llc.vercel.app/contact.html" target="_blank" rel="noreferrer">Contact</a>
        <a href="https://103-software-solutions-llc.vercel.app/privacy.html" target="_blank" rel="noreferrer">Privacy</a>
        <a href="https://103-software-solutions-llc.vercel.app/terms.html" target="_blank" rel="noreferrer">Terms</a>
      </nav>
      <p>© 2026 A.I. The Shooter. All rights reserved.</p>
      <p>Developed by 103 Software Solutions LLC</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Music />
        <Videos />
        <Gallery />
        <Follow />
      </main>
      <Footer />
    </>
  )
}
