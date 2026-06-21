'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { OWNER, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTS } from '@/data/portfolio'

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(15,12,30,0.8)',
  border: '1px solid rgba(124,106,247,0.3)',
  boxShadow: '2px 2px 0 #7c6af7',
  padding: '1.25rem',
  marginBottom: '1rem',
}

export default function PortfolioView() {
  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: '#0a0a0f', zIndex: 10 }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        {/* Hero */}
        <Section>
          <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
            <h1
              className="font-pixel"
              style={{ color: '#f5c842', fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}
            >
              {OWNER.name}
            </h1>
            <p
              className="font-pixel"
              style={{ color: '#7c6af7', fontSize: '0.8rem', marginBottom: '1rem' }}
            >
              {OWNER.title}
            </p>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
              {OWNER.location}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${OWNER.email}`}
                style={{ color: '#7c6af7', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ✉ {OWNER.email}
              </a>
              <a
                href={OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#60a5fa', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ↗ LinkedIn
              </a>
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#a78bfa', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ↗ GitHub
              </a>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section>
          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem' }}
          >
            EXPERIENCE
          </h2>
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <p
                    className="font-pixel"
                    style={{ color: exp.color, fontSize: '0.7rem', marginBottom: '0.25rem' }}
                  >
                    {exp.role}
                  </p>
                  <p style={{ color: '#ccc', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem' }}>
                    {exp.company}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {exp.active && (
                    <span
                      className="font-pixel"
                      style={{
                        background: 'rgba(124,106,247,0.2)',
                        border: '1px solid #7c6af7',
                        color: '#7c6af7',
                        fontSize: '0.55rem',
                        padding: '2px 6px',
                      }}
                    >
                      FULL-TIME
                    </span>
                  )}
                  <span style={{ color: '#666', fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem' }}>
                    {exp.period}
                  </span>
                </div>
              </div>
              <ul style={{ paddingLeft: '1rem' }}>
                {exp.points.map((pt, i) => (
                  <li
                    key={i}
                    style={{ color: '#aaa', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', marginBottom: '0.25rem' }}
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section>
          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem', marginTop: '2rem' }}
          >
            PROJECTS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                style={{
                  background: 'rgba(15,12,30,0.8)',
                  border: '1px solid rgba(124,106,247,0.3)',
                  boxShadow: `2px 2px 0 ${proj.glowColor}`,
                  padding: '1.25rem',
                }}
              >
                <p
                  className="font-pixel"
                  style={{ color: proj.glowColor, fontSize: '0.65rem', marginBottom: '0.5rem' }}
                >
                  {proj.name}
                </p>
                <p style={{ color: '#aaa', fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  {proj.role}
                </p>
                <p style={{ color: '#666', fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  {proj.period}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(124,106,247,0.1)',
                        border: '1px solid rgba(124,106,247,0.3)',
                        color: '#a89ef8',
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '0.7rem',
                        padding: '1px 6px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel"
                  style={{ color: proj.glowColor, fontSize: '0.6rem', textDecoration: 'none', opacity: 0.8 }}
                >
                  VIEW ↗
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section>
          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem', marginTop: '2rem' }}
          >
            SKILLS
          </h2>
          <div style={cardStyle}>
            {(Object.entries(SKILLS) as [string, string[]][]).map(([group, items]) => (
              <div key={group} style={{ marginBottom: '0.75rem' }}>
                <p
                  className="font-pixel"
                  style={{ color: '#7c6af7', fontSize: '0.6rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}
                >
                  {group}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: 'rgba(124,106,247,0.12)',
                        border: '1px solid rgba(124,106,247,0.35)',
                        color: '#ccc',
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '0.8rem',
                        padding: '2px 10px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Education & Certs */}
        <Section>
          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem', marginTop: '2rem' }}
          >
            EDUCATION
          </h2>
          {EDUCATION.map((edu, i) => (
            <div key={i} style={cardStyle}>
              <p
                className="font-pixel"
                style={{ color: '#60a5fa', fontSize: '0.65rem', marginBottom: '0.25rem' }}
              >
                {edu.degree}
              </p>
              <p style={{ color: '#aaa', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem' }}>
                {edu.school}
              </p>
              <p style={{ color: '#666', fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem' }}>
                {edu.period}
              </p>
            </div>
          ))}

          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem', marginTop: '2rem' }}
          >
            CERTIFICATIONS
          </h2>
          {CERTS.map((cert, i) => (
            <div key={i} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <p style={{ color: '#ccc', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  {cert.name}
                </p>
                <p style={{ color: '#7c6af7', fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem' }}>
                  {cert.issuer}
                </p>
              </div>
              <span
                className="font-pixel"
                style={{ color: '#666', fontSize: '0.6rem' }}
              >
                {cert.date}
              </span>
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section>
          <h2
            className="font-pixel"
            style={{ color: '#f5c842', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245,200,66,0.3)', paddingBottom: '0.5rem', marginTop: '2rem' }}
          >
            CONTACT
          </h2>
          <div style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`mailto:${OWNER.email}`}
                style={{ color: '#7c6af7', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ✉ {OWNER.email}
              </a>
              <a
                href={OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#60a5fa', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ↗ LinkedIn: tirthesh-dhaigude
              </a>
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#a78bfa', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ↗ GitHub: Tirthesh13
              </a>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
