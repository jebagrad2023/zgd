import React, { useState } from 'react'

import { MessageBoard } from '@zgd/components/organisms/MessageBoard'
import { BWindow } from '@zgd/components/organisms/BWindow'

import iconMessages from '@zgd/images/icon_messages.png'

enum WindowContent {
  ContentNone,
  ContentMessages,
  ContentDummy,
}

export const Desktop = (): JSX.Element => {
  const [opened, setOpened] = useState(WindowContent.ContentMessages)
  const closeWindow = () => setOpened(WindowContent.ContentNone)
  const selectContent = (c: WindowContent) => () => setOpened(c)

  return (
    <div id="desktop">
      <div className="desktopItems">
        <div
          className="desktopItem"
          onClick={selectContent(WindowContent.ContentMessages)}
        >
          <img src={iconMessages} className="icon" />
          <div className="name">Messages from Kernels</div>
        </div>
        <div
          className="desktopItem"
          onClick={selectContent(WindowContent.ContentDummy)}
        >
          <div className="icon" />
          <div className="name">Something</div>
        </div>
      </div>
      {opened == WindowContent.ContentMessages && (
        <BWindow title="Messages from Kernels" onClose={closeWindow}>
          <MessageBoard />
        </BWindow>
      )}
      {opened == WindowContent.ContentDummy && (
        <BWindow title="Something" onClose={closeWindow}>
          ...?
        </BWindow>
      )}
    </div>
  )
}
