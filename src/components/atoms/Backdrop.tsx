import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Backdrop = ({ children }: Props): JSX.Element => (
  <div className="backdrop">{children}</div>
)
