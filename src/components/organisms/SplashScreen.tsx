import React, { useState, useEffect, useRef } from 'react'

import beamsProgress from '@zgd/images/beams_progress.png'
import beamsLogo from '@zgd/images/beams.png'

type Props = {
  onDone: () => void
}

const progressPattern = [1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9]

export const SplashScreen = ({ onDone }: Props): JSX.Element => {
  const [progress, setProgress] = useState(1)
  const outerScreen = useRef<HTMLDivElement>()

  useEffect(() => {
    const img = new Image()
    let timer: ReturnType<typeof setInterval>
    img.onload = () => {
      timer = setInterval(() => setProgress((p) => p + 1), 150)
    }
    img.src = beamsLogo
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])
  useEffect(() => {
    if (progress === progressPattern.length - 6) {
      outerScreen.current.classList.add('zoomOut')
    }
    if (progress === progressPattern.length + 4) {
      onDone()
    }
  }, [progress])

  const bar =
    progress < progressPattern.length
      ? progressPattern[progress]
      : progressPattern[progressPattern.length - 1]

  return (
    <div id="splashOuterScreen" ref={outerScreen}>
      <div
        id="splashScreen"
        className={progress > progressPattern.length ? 'transitioning' : ''}
        onClick={onDone}
      >
        <div id="beamsLogo">
          <div id="beamsProgressArea">
            {Array.from(Array(bar).keys()).map((i) => (
              <img src={beamsProgress} className="beamsProgress" key={i} />
            ))}
          </div>
        </div>
      </div>
      <div id="splashFrameAntenna" />
      <div id="splashFrameTop" />
      <div id="splashFrameLeft" />
      <div id="splashFrameRight" />
      <div id="splashFrameBottom" />
      <div id="splashFrameLT" />
      <div id="splashFrameRT" />
      <div id="splashFrameLB" />
      <div id="splashFrameRB" />
    </div>
  )
}
