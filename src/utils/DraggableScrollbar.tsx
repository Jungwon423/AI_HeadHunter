import React, { useRef, MouseEvent } from 'react'

interface DraggableScrollbarProps {
  children: React.ReactNode
}

const DraggableScrollbar: React.FC<DraggableScrollbarProps> = ({
  children,
}) => {
  const refContainer = useRef<HTMLDivElement | null>(null)
  let isPressed = false
  let startX: number
  let scrollLeft: number

  const onMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    isPressed = true
    startX = e.pageX - (refContainer.current?.offsetLeft ?? 0)
    scrollLeft = refContainer.current?.scrollLeft ?? 0
  }

  const onMouseUp = (): void => {
    isPressed = false
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isPressed) return
    e.preventDefault()
    const mouseX = e.pageX - (refContainer.current?.offsetLeft ?? 0)
    const walk = (mouseX - startX) * 2
    if (refContainer.current) {
      refContainer.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <div
      className="relative inline-flex overflow-hidden whitespace-nowrap"
      ref={refContainer}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  )
}

export default DraggableScrollbar
