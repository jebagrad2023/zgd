import React from 'react'
import { createRoot } from 'react-dom/client'

import { MessageBoard } from '@zgd/components/organisms/MessageBoard'
import { Header } from '@zgd/components/atoms/Header'

import '@zgd/styles.scss'

const Root = (): JSX.Element => (
  <div id="container">
    <div id="main">
      <Header>One. Cob. Mind.</Header>
      <div id="contents">
        <MessageBoard />
      </div>
    </div>
  </div>
)

createRoot(document.getElementById('root')).render(<Root />)
