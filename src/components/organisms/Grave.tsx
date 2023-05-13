import React, { useEffect, useRef, useState } from 'react'

import { usePersistState } from '@zgd/hooks/usePersistState'
import { ZoomableImage } from '@zgd/components/organisms/ZoomableImage'

import MemorialFrame from '@zgd/images/zeaframewiggle1.gif'
import zeaGhost from '@zgd/images/zea_ghost.png'
import zeaGraveMarker from '@zgd/images/zea_grave_marker.png'
import zeaGraveHer from '@zgd/images/zea_grave_her.png'
import zeaGraveLivers from '@zgd/images/zea_grave_livers.png'

export const Grave = (): JSX.Element => {
  const [clickedCnt, setClickedCnt] = usePersistState('GhostClickedCount', 0)
  const [showGrave, setShowGrave] = useState(false)
  const ghost = useRef<HTMLImageElement>()

  useEffect(() => {
    const startPassing = () => {
      if (!ghost.current) {
        return
      }
      const onAnimationEnd = () => {
        ghost.current.style.display = 'none'
      }
      ghost.current.style.top = `${Math.random() * 80}vh`
      ghost.current.style.display = 'block'
      ghost.current.addEventListener('animationend', onAnimationEnd)
    }
    const wait = () => 30000 + Math.floor(Math.random() * 60000)

    let timer: ReturnType<typeof setTimeout>
    const trigger = () => {
      startPassing()
      timer = setTimeout(trigger, wait())
    }
    timer = setTimeout(trigger, wait())

    return () => clearTimeout(timer)
  }, [ghost])

  const clickGhost = (e: React.MouseEvent) => {
    e.preventDefault()
    setClickedCnt((n) => n + 1)
    ghost.current.style.display = 'none'
  }

  const showHideGrave = () => setShowGrave((v) => !v)
  const onGraveLiverLoad = (e: React.SyntheticEvent<HTMLImageElement>) =>
    setTimeout(() => (e.target as HTMLImageElement).scrollIntoView(), 50)

  return (
    <div className="graveBG">
      <div className="graveContents">
        <div className="topMemorialTitle">
          IN LOVING MEMORY OF <br />
          ZEA CORNELIA <br />
        </div>
        <img src={MemorialFrame} className="frame" /> <br />
        <img
          className="bottomMemorialTitle"
          src={zeaGraveMarker}
          onClick={showHideGrave}
        />
        {showGrave && (
          <div id="gravePics">
            <ZoomableImage
              className="graveLivers"
              src={zeaGraveLivers}
              onImageLoad={onGraveLiverLoad}
            />
            <ZoomableImage className="graveHer" src={zeaGraveHer} />
          </div>
        )}
        {clickedCnt > 0 && (
          <div id="zeaGhostClickCnt">YOU GOT {clickedCnt} GHOSTS</div>
        )}
      </div>
      <div id="zeaGhost" ref={ghost}>
        <img
          src={zeaGhost}
          className="cursorPointer"
          onMouseDown={clickGhost}
        />
      </div>
      {clickedCnt > 0 && (
        <div
          id="orangGila"
          style={{ opacity: (clickedCnt > 25 ? 25 : clickedCnt) * 0.02 }}
        />
      )}
    </div>
  )
}
