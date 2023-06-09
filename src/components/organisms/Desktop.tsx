import React from 'react'

import { MessageBoard } from '@zgd/components/organisms/MessageBoard'
import { Calendar } from '@zgd/components/organisms/Calendar'
import { Downloads } from '@zgd/components/organisms/Downloads'
import { Collage } from '@zgd/components/organisms/Collage'
import { Grave } from '@zgd/components/organisms/Grave'
import { BWindow } from '@zgd/components/organisms/BWindow'
import { SplashScreen } from '@zgd/components/organisms/SplashScreen'
import { BEAChatBot } from '@zgd/components/organisms/BEAChatBot'
import { AccessCounter } from '@zgd/components/organisms/AccessCounter'

import { usePersistState } from '@zgd/hooks/usePersistState'

import iconMessages from '@zgd/images/icon_messages.png'
import iconGifts from '@zgd/images/icon_gifts.png'
import iconCalendar from '@zgd/images/icon_calendar.png'
import iconCollage from '@zgd/images/icon_zeazone.gif'
import iconGrave from '@zgd/images/icon_coffin.png'

enum WindowContent {
  ContentSplashScreen,
  ContentNone,
  ContentMessages,
  ContentDownloads,
  ContentCalendar,
  ContentCollage,
  ContentGrave,
}

export const Desktop = (): JSX.Element => {
  const [opened, setOpened] = usePersistState(
    'OpenedWindowContent',
    WindowContent.ContentSplashScreen,
    window.performance.navigation.type !== 1,
  )
  const closeWindow = () => setOpened(() => WindowContent.ContentNone)
  const selectContent = (c: WindowContent) => () => setOpened(() => c)

  if (opened === WindowContent.ContentSplashScreen) {
    return (
      <SplashScreen onDone={selectContent(WindowContent.ContentMessages)} />
    )
  }

  return (
    <div id="desktop">
      <div className="desktopItems">
        <div
          className="desktopItem cursorPointer"
          onClick={selectContent(WindowContent.ContentMessages)}
        >
          <img src={iconMessages} className="icon" />
          <div className="name">Messages from Kernels</div>
        </div>
        <div
          className="desktopItem cursorPointer"
          onClick={selectContent(WindowContent.ContentDownloads)}
        >
          <img src={iconGifts} className="icon" />
          <div className="name">Special Gifts</div>
        </div>
        <div
          className="desktopItem cursorPointer"
          onClick={selectContent(WindowContent.ContentCalendar)}
        >
          <img src={iconCalendar} className="icon" />
          <div className="name">Calendar</div>
        </div>
        <div
          className="desktopItem cursorPointer"
          onClick={selectContent(WindowContent.ContentGrave)}
        >
          <img src={iconGrave} className="icon" />
          <div className="name">Memorial</div>
        </div>
        <div
          className="desktopItem cursorPointer"
          onClick={selectContent(WindowContent.ContentCollage)}
        >
          <img src={iconCollage} className="icon" />
          <div className="name">THE ZEA ZONE</div>
        </div>
      </div>
      <div className="desktopCounter">
        <AccessCounter />
      </div>
      {opened == WindowContent.ContentMessages && (
        <BWindow title="Messages from Kernels" onClose={closeWindow}>
          <MessageBoard />
        </BWindow>
      )}
      {opened == WindowContent.ContentDownloads && (
        <BWindow title="Special Gifts" onClose={closeWindow}>
          <Downloads />
        </BWindow>
      )}
      {opened == WindowContent.ContentCalendar && (
        <BWindow title="Calendar" onClose={closeWindow}>
          <Calendar />
        </BWindow>
      )}
      {opened == WindowContent.ContentGrave && (
        <BWindow title="Memorial" onClose={closeWindow} noPadding>
          <Grave />
        </BWindow>
      )}
      {opened == WindowContent.ContentCollage && (
        <BWindow title="THE ZEA ZONE" onClose={closeWindow} noPadding noScroll>
          <Collage />
        </BWindow>
      )}
      <BEAChatBot />
    </div>
  )
}
