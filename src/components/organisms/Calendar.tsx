import React from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const drawDiamond = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.lineTo(0, 0)
  ctx.lineTo(8, 12)
  ctx.lineTo(0, 24)
  ctx.lineTo(-8, 12)
  ctx.lineTo(0, 0)
  ctx.fill()
  ctx.closePath()
}

export const Calendar = (): JSX.Element => {
  const { width, height } = useWindowSize()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()

  const m2 = month < 3 ? month + 12 : month
  const y2 = month < 3 ? year - 1 : year
  const c = Math.floor(y2 / 100)
  const y = y2 % 100

  const gamma = 5 * c + Math.floor(c / 4)
  const startDoW =
    ((1 +
      Math.floor((26 * (m2 + 1)) / 10) +
      y +
      Math.floor(y / 4) +
      gamma +
      5) %
      7) +
    1

  const ds =
    month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
      ? 29
      : days[month - 1]

  const cells = [
    ...Array.from({ length: startDoW }, () => null),
    ...Array.from({ length: ds }, (_, i) => i),
  ]

  return (
    <>
      <div id="calendarOverlay">
        <Confetti
          colors={['#fbec5d', '#f90']}
          drawShape={drawDiamond}
          width={width}
          height={height}
        />
      </div>
      <div id="calendarTop">TODAY IS AUGUST 29 ({year})</div>
      <div id="calendarWhatsToday">
        <p>
          Watch today's ZEA Birthday Stream!
          <iframe
            src="https://www.youtube.com/embed/GxmLJ-z-AcE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
      </div>
      <div id="calendarOuter">
        {cells.map((v, i) => (
          <div
            className={`calendarDay dayOfWeek${i % 7} ${
              v === null && 'notThisMonth'
            } ${v + 1 === date && 'today'}`}
          >
            <div className="calendarDayNumber">
              {v + 1 === date ? 29 : v + 1}
            </div>
            <div className="calendarDayDescription">
              {v + 1 === date && "ZEA's Birthday!!"}
            </div>
          </div>
        ))}
      </div>
      <div id="calendarFooter" />
    </>
  )
}
