import React from 'react'

import { Header } from '@zgd/components/atoms/Header'

type Props = {
  title: string
  children: React.ReactNode
  onClose: () => void
  noPadding?: boolean
}

export const BWindow = ({
  title,
  children,
  onClose,
  noPadding = false,
}: Props): JSX.Element => (
  <div id="windowOuter">
    <div id="windowInner">
      <Header>
        {title}
        <div id="closeWindow" onClick={onClose} className="cursorPointer" />
      </Header>
      <div id="contents" className={noPadding ? 'noPadding' : ''}>
        {children}
      </div>
    </div>
  </div>
)
