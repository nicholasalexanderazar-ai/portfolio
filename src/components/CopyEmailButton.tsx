/*
  CopyEmailButton — pill that grows rightward on hover.

  Default:  "Copy my email"  (narrow)
  Hover:    email (left) | Copy (right)
  Click:    copies, shows green ✓ + "Copied!" for 2s then fades back to "Copy"
*/
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMAIL = 'nicholasalexanderazar@gmail.com'
const W_DEFAULT  = 136
const W_EXPANDED = 325

interface CopyEmailButtonProps {
  dark?: boolean
}

export default function CopyEmailButton({ dark = false }: CopyEmailButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [copied,  setCopied]  = useState(false)

  const bg  = dark ? '#ffffff' : '#111111'
  const fg  = dark ? '#111111' : '#ffffff'
  const sep = dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)'

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
      <motion.button
        onClick={handleCopy}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ width: hovered ? W_EXPANDED : W_DEFAULT }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:     'relative',
          height:       '40px',
          borderRadius: '999px',
          border:       'none',
          background:   bg,
          color:        fg,
          fontSize:     '13px',
          fontWeight:   '500',
          cursor:       'pointer',
          overflow:     'hidden',
          whiteSpace:   'nowrap',
          display:      'block',
        }}
      >
        {/* Default label — shows copied feedback on mobile (no hover), hides on desktop hover */}
        <motion.span
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            pointerEvents:  'none',
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="mob-copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#22c55e' }}
              >
                <span style={{ fontSize: '13px', lineHeight: 1 }}>✓</span>
                <span>Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="mob-copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                Copy my email
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>

        {/* Expanded — email left, Copy/Copied right */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: hovered ? 0.12 : 0 }}
          style={{
            position:       'absolute',
            left:           '20px',
            right:          '16px',
            top:            '50%',
            transform:      'translateY(-50%)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            pointerEvents:  'none',
          }}
        >
          <span style={{ color: fg }}>{EMAIL}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ width: '1px', height: '12px', background: sep }} />
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e' }}
                >
                  <span style={{ fontSize: '12px', lineHeight: 1 }}>✓</span>
                  <span>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  style={{ color: fg }}
                >
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.span>
      </motion.button>
    </div>
  )
}
