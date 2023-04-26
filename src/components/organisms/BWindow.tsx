import React from 'react'

import { Header } from '@zgd/components/atoms/Header'

type Props = {
  title: string
  children: React.ReactNode
  onClose: () => void
}

export const BWindow = ({ title, children, onClose }: Props): JSX.Element => (
  <div id="container">
    <div id="main">
      <Header>
        {title}
        <div id="closeWindow" onClick={onClose} />
      </Header>
      <div id="contents">{children}</div>
    </div>
  </div>
)
