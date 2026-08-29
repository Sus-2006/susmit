'use client'

import { useEffect, useMemo, useState } from 'react'

const regions = [
  { id: 'electrical', code: 'ELEC-01', name: 'Electrical Engineering', blurb: 'Circuits, power systems, and the physical logic beneath every mission.', tags: ['Circuit Design', 'Power Systems', 'Signals'], tone: 'cyan' },
  { id: 'software', code: 'SOFT-02', name: 'Software / Development', blurb: 'Building clear, useful interfaces and systems that turn ideas into tools.', tags: ['Python', 'C++', 'Web'], tone: 'violet' },
  { id: 'aerospace', code: 'AERO-03', name: 'Aerospace / Space Systems', blurb: 'Curious about the constraints, elegance, and scale of machines beyond Earth.', tags: ['Orbital Systems', 'Flight', 'Mission Design'], tone: 'amber' },
  { id: 'robotics', code: 'ROBO-04', name: 'Robotics / Embedded', blurb: 'Where code meets motion: low-level thinking for responsive machines.', tags: ['Embedded C', 'Sensors', 'Control'], tone: 'green' },
  { id: 'research', code: 'RES-05', name: 'Research', blurb: 'Following hard questions until they become something we can build on.', tags: ['Capillary-Fed Electrolysis', 'Energy', 'Experiments'], tone: 'blue' },
  { id: 'projects', code: 'PRJ-06', name: 'Projects', blurb: 'Selected signals from an ongoing archive of experiments and builds.', tags: ['Selected Work', 'Prototypes', 'In Progress'], tone: 'rose' },
]

function Moon({ onSelect, selected }: { onSelect: (id: string) => void; selected: string | null }) {
  return (
    <div className="moon-stage" aria-label="Interactive lunar surface map">
      <div className="moon-glow" />
      <div className="moon">
        <div className="moon-crater crater-a" /><div className="moon-crater crater-b" /><div className="moon-crater crater-c" /><div className="moon-crater crater-d" /><div className="moon-crater crater-e" />
        <div className="moon-ridge" />
        {regions.map((region, index) => <button key={region.id} className={`beacon beacon-${index + 1} ${selected === region.id ? 'beacon-active' : ''}`} onClick={() => onSelect(region.id)} aria-label={`Explore ${region.name}`}><span className="beacon-pulse" /><span className="beacon-dot" /><span className="beacon-label">{region.code}</span></button>)}
      </div>
    </div>
  )
}

export default function Page() {
  const [booted, setBooted] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [showFuture, setShowFuture] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const region = useMemo(() => regions.find((item) => item.id === selected), [selected])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setSelected(null); setShowFuture(false) } }
    const onMove = (event: MouseEvent) => setParallax({ x: (event.clientX / window.innerWidth - 0.5) * 12, y: (event.clientY / window.innerHeight - 0.5) * 8 })
    window.addEventListener('keydown', onKey); window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousemove', onMove) }
  }, [])

  if (!booted) return <main className="boot-screen"><div className="boot-grid" /><div className="boot-card"><div className="boot-mark">SB<span>·</span>26</div><p className="eyebrow">PORTFOLIO // LUNAR ARCHIVE</p><h1>Welcome to<br /><em>my orbit.</em></h1><p className="boot-copy">A digital field guide to the work, curiosity, and systems of Susmit Bhar.</p><button className="enter-button" onClick={() => setBooted(true)}><span>Enter mission control</span><span>↗</span></button><p className="boot-hint">Press enter or click to initialize</p></div><div className="boot-footer"><span>SYS.STATUS / STANDBY</span><span>LAT 28.6139° N &nbsp; LON 77.2090° E</span></div></main>

  return <main className="site-shell" style={{ '--px': `${parallax.x}px`, '--py': `${parallax.y}px` } as React.CSSProperties}>
    <div className="starfield" /><header className="topbar"><button className="brand" onClick={() => { setSelected(null); setShowFuture(false) }} aria-label="Return to overview"><span className="brand-symbol">◒</span><span>SB / FIELD NOTES</span></button><div className="system-status"><span className="status-dot" /> SYSTEMS ONLINE <span className="status-divider" /> ORBIT 01</div><button className="future-link" onClick={() => { setShowFuture(true); setSelected(null) }}>Future missions <span>↗</span></button></header>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">SUSMIT BHAR / ENGINEER + BUILDER</p><h1>Building at the<br /><em>edge of possible.</em></h1><p className="hero-intro">Electrical engineering, software, and a steady pull toward space. Scroll the surface to explore the systems I&apos;m learning to shape.</p><div className="hero-meta"><span>06 ACTIVE REGIONS</span><span>·</span><span>FIELD LOG 2026</span></div></div><Moon onSelect={(id) => { setSelected(id); setShowFuture(false) }} selected={selected} /></section>
    <aside className="side-nav"><span className="side-label">MAP LAYERS</span>{regions.map((item) => <button key={item.id} className={selected === item.id ? 'nav-active' : ''} onClick={() => setSelected(item.id)}><span className="nav-line" />{item.name}</button>)}</aside>
    <div className="telemetry"><span><b>01</b> / 06</span><span className="telemetry-line" /><span>DRAG TO EXPLORE <span className="mouse-icon">↓</span></span></div>
    {region && <div className="dossier-backdrop" onClick={() => setSelected(null)}><article className="dossier" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close dossier">×</button><p className={`eyebrow tone-${region.tone}`}>{region.code} / REGION ONLINE</p><h2>{region.name}</h2><p className="dossier-copy">{region.blurb}</p><div className="dossier-rule" /><p className="eyebrow">CURRENT SIGNALS</p><div className="tag-list">{region.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="dossier-foot"><span>COORD. {28 + regions.indexOf(region) * 3}.4° N / 77.2° E</span><span>STATUS: EXPLORING</span></div></article></div>}
    {showFuture && <div className="future-panel"><button className="close-button" onClick={() => setShowFuture(false)} aria-label="Close future missions">×</button><p className="eyebrow">HORIZON SCAN / 2026—</p><h2>Next, beyond<br /><em>the visible.</em></h2><p>More systems to study. More useful things to build. The next mission is still being mapped.</p><div className="future-list"><div><span>01</span><strong>Deepen the stack</strong><small>Embedded systems · controls · software</small></div><div><span>02</span><strong>Reach orbit</strong><small>Aerospace systems · research · flight</small></div><div><span>03</span><strong>Leave a signal</strong><small>Open work · shared tools · collaboration</small></div></div></div>}
  </main>
}
