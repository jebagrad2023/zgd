import React, { useState } from 'react'

type Props = {
  src: string
}

export const ZoomableImage = ({ src }: Props): JSX.Element => {
  const [zoomed, setZoomed] = useState(false)
  const toggleZoomed = () => setZoomed((z) => !z)
  return (
    <div className="zoomableImage" onClick={toggleZoomed}>
      {zoomed && (
        <div className="backdrop">
          <img src={src} />
        </div>
      )}
      <img src={src} loading="lazy" />
    </div>
  )
}
