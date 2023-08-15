import { useEffect, useRef, MutableRefObject } from 'react'

type Callback = (e: MouseEvent) => void

const useClickOutside = <T extends HTMLElement>(
  callback: Callback,
): MutableRefObject<T | null> => {
  const clickOutsideRef = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(e.target as Node)
      ) {
        callback(e)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  return clickOutsideRef
}

export default useClickOutside
