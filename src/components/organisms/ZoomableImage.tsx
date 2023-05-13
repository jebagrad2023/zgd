import React, { useState } from 'react'

import { Backdrop } from '@zgd/components/atoms/Backdrop'

type Props = {
  src: string
  style?: React.CSSProperties
  className?: string
  refImage?: React.MutableRefObject<HTMLImageElement>
  onImageLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export const ZoomableImage = ({
  src,
  style,
  className,
  refImage,
  onImageLoad,
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
      <img
        src={src}
        ref={refImage}
        style={style}
        onLoad={onImageLoad}
        loading="lazy"
        className={['cursorPointer', className].join(' ')}
      />
    </div>
  )
}
