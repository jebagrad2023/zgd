import React from 'react'

import { Header } from '@zgd/components/atoms/Header'

type Props = {
  title: string
  children: React.ReactNode
  onClose: () => void
  noPadding?: boolean
  noScroll?: boolean
}

export const BWindow = ({
  title,
  children,
  onClose,
  noPadding = false,
  noScroll = false,
}: Props): JSX.Element => (
  <div id="windowOuter">
    <div id="windowInner">
      <Header>
        {title}
        <div id="closeWindow" onClick={onClose} className="cursorPointer" />
      </Header>
      <div
        id="contents"
        className={`${noPadding ? 'noPadding' : ''} ${
          noScroll ? 'noScroll' : ''
        }`}
      >
        {children}
      </div>
    </div>
  </div>
)
