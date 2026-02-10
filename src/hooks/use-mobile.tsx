"use client";

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // This function will only run on the client side, after the initial render.
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Run the check on mount.
    checkDevice()

    // Add a listener for window resize.
    window.addEventListener('resize', checkDevice)

    // Cleanup the listener when the component unmounts.
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, []) // The empty dependency array ensures this effect runs only once on mount.

  return isMobile
}
