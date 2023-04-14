import React from 'react'
import { createRoot } from 'react-dom/client'

import { MessageBoard } from '@zgd/components/organisms/MessageBoard'

import '@zgd/styles.scss'

const Root = (): JSX.Element => {
  return (
    <>
      <div id="container">
        <div id="mainLogo" />
        <div id="main">
          <h1>One. Cob. Mind.</h1>
          <MessageBoard />
        </div>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
