import React, { useState } from 'react'

import { Backdrop } from '@zgd/components/atoms/Backdrop'

type Props = {
  src: string
}

export const ZoomableImage = ({ src }: Props): JSX.Element => {
  const [zoomed, setZoomed] = useState(false)
  const toggleZoomed = () => setZoomed((z) => !z)
  return (
    <div className="zoomableImage" onClick={toggleZoomed}>
      {zoomed && (
        <Backdrop>
          <img src={src} />
        </Backdrop>
      )}
      <img src={src} loading="lazy" />
    </div>
  )
}
