import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Lekki wrapper animujący wejście elementu przy przewijaniu (scroll reveal).
 * Respektuje preferencję prefers-reduced-motion (Framer Motion robi to automatycznie).
 */
export function Reveal({ children, className, delay = 0, direction = 'up', as = 'div' }: RevealProps) {
  const { x, y } = offset[direction]

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    show: { opacity: 1, x: 0, y: 0 },
  }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
