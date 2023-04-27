import React, { useState, useEffect } from 'react'

type Props = {
  onDone: () => void
}

const progressPattern = [1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9]

export const SplashScreen = ({ onDone }: Props): JSX.Element => {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => p + 1), 150)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === progressPattern.length + 4) {
      onDone()
    }
  }, [progress])

  const bar =
    progress < progressPattern.length
      ? progressPattern[progress]
      : progressPattern[progressPattern.length - 1]

  return (
    <div
      id="splashScreen"
      className={progress > progressPattern.length ? 'transitioning' : ''}
    >
      <div id="beamsLogo">
        {Array.from(Array(bar).keys()).map((i) => (
          <div className="beamsProgress" key={i} />
        ))}
      </div>
    </div>
  )
}
