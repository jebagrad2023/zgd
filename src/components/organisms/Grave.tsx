import React, { useEffect, useRef } from 'react'

import MemorialFrame from '@zgd/images/zeaframewiggle1.gif'
import zeaGhost from '@zgd/images/zea_ghost.png'

export const Grave = (): JSX.Element => {
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

  return (
    <div className="graveBG">
      <div className="graveContents">
        <div className="topMemorialTitle">
          IN LOVING MEMORY OF <br />
          ZEA CORNELIA <br />
        </div>
        <img src={MemorialFrame} className="frame" /> <br />
        <div className="bottomMemorialTitle">2019 - 2023</div>
      </div>
      <div id="zeaGhost" ref={ghost}>
        <img src={zeaGhost} />
      </div>
    </div>
  )
}
