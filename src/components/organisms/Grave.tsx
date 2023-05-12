import React, { useEffect, useRef } from 'react'

import { usePersistState } from '@zgd/hooks/usePersistState'

import MemorialFrame from '@zgd/images/zeaframewiggle1.gif'
import zeaGhost from '@zgd/images/zea_ghost.png'

export const Grave = (): JSX.Element => {
  const [clickedCnt, setClickedCnt] = usePersistState('GhostClickedCount', 0)
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

  return (
    <div className="graveBG">
      <div className="graveContents">
        <div className="topMemorialTitle">
          IN LOVING MEMORY OF <br />
          ZEA CORNELIA <br />
        </div>
        <img src={MemorialFrame} className="frame" /> <br />
        <div className="bottomMemorialTitle">2019 - 2023</div>
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
    </div>
  )
}
