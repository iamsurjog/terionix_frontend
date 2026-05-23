import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onHoverable = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input, textarea, select, [role="button"]')
      if (target) {
        ringRef.current?.classList.add('hovering')
      } else {
        ringRef.current?.classList.remove('hovering')
      }
    }

    const animate = () => {
      dotX += (mouseX - dotX) * 0.25
      dotY += (mouseY - dotY) * 0.25
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouse)
    document.addEventListener('mouseover', onHoverable)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseover', onHoverable)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
