import React from 'react'

const playPauseClick = () => {
  const animations = document.querySelectorAll<HTMLElement>('.scrolling-image')
  animations.forEach((animation) => {
    const running = animation.style.animationPlayState || 'running'
    animation.style.animationPlayState =
      running === 'running' ? 'paused' : 'running'
  })
}

export const Collage = (): JSX.Element => {
  const click = () => {
    const confirmed = window.confirm(
      'WARNING!!\nYou are entering to the [SECRET #ZEANGE ZONE].\nAre you a responsible adult?',
    )
    if (confirmed) {
      window.location.href = 'https://youtu.be/8cOzNcHSDy4'
    }
  }
  return (
    <div className="scrolling-image-container">
      <div className="scrolling-image" onClick={() => playPauseClick()}></div>
      <div id="hiddenLink" className="cursorPointer" onClick={click}>
        SECRET #ZEANGE ZONE
      </div>
    </div>
  )
}
