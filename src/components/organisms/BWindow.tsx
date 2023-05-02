import React from 'react'

import { Header } from '@zgd/components/atoms/Header'

type Props = {
  title: string
  children: React.ReactNode
  onClose: () => void
}

export const BWindow = ({ title, children, onClose }: Props): JSX.Element => (
  <div id="windowOuter">
    <div id="windowInner">
      <Header>
        {title}
        <div id="closeWindow" onClick={onClose} className="cursorPointer" />
      </Header>
      <div id="contents">{children}</div>
    </div>
  </div>
)
