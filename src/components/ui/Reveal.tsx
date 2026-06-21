import { motion, useReducedMotion, type Variants } from 'framer-motion'
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
  // Reduced-motion: bez przesunięć (x/y = 0) i treść od razu widoczna (opacity 1),
  // niezależnie od tego, czy whileInView/IntersectionObserver zdąży zadziałać.
  // To eliminuje też poziome wyjście poza ekran (x: ±40) na mobile.
  const reduce = useReducedMotion()
  const { x, y } = reduce ? { x: 0, y: 0 } : offset[direction]

  const variants: Variants = {
    hidden: { opacity: reduce ? 1 : 0, x, y },
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
