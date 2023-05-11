import React from 'react'

const playPauseClick = () => {
    const animations = document.querySelectorAll<HTMLElement>('.scrolling-image');
    animations.forEach(animation => {
            const running = animation.style.animationPlayState || 'running';
            animation.style.animationPlayState = running === 'running' ? 'paused' : 'running';
        })
  }

export const Collage = (): JSX.Element => (
  <>
   <div className="scrolling-image-container">
     <div className="scrolling-image" onClick={()=>playPauseClick()}></div>
   </div>
  </>
)