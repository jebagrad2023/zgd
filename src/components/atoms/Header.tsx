import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Header = ({ children }: Props): JSX.Element => (
  <h1>
    <span className="beaMark" /> BEA MS<span className="upper">ZM</span> |{' '}
    {children}
  </h1>
)
