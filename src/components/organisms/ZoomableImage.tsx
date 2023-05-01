import React, { useState } from 'react'

import { Backdrop } from '@zgd/components/atoms/Backdrop'

type Props = {
  src: string
  style?: React.CSSProperties
  className?: string
}

export const ZoomableImage = ({
  src,
  style,
  className,
}: Props): JSX.Element => {
  const [zoomed, setZoomed] = useState(false)
  const toggleZoomed = () => setZoomed((z) => !z)
  return (
    <div className="zoomableImage" onClick={toggleZoomed}>
      {zoomed && (
        <Backdrop>
          <img src={src} />
        </Backdrop>
      )}
      <img src={src} style={style} loading="lazy" className={className} />
    </div>
  )
}
