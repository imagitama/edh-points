import { useRef, useState, useEffect } from 'react'

const useDelay = (delay, subs) => {
  const [isDelayComplete, setIsDelayComplete] = useState(false)
  const timer = useRef()

  useEffect(() => {
    let isMounted = true

    setIsDelayComplete(false)

    clearInterval(timer.current)

    timer.current = setTimeout(() => {
      // Avoid no-op
      if (!isMounted) {
        return
      }
      setIsDelayComplete(true)
    }, delay)

    return () => (isMounted = false)
  }, subs)

  return isDelayComplete
}

export default useDelay
