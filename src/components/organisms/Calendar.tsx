import React, { useState } from 'react'

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

  const [cells, setCells] = useState(() => [
    ...Array.from({ length: startDoW }, () => null),
    ...Array.from({ length: ds }, (_, i) => (i + 1 === date ? 0 : i + 1)),
  ])

  const everyday = cells.reduce((a, v) => (v === null ? a : a && v === 0), true)

  return (
    <>
      <div id="calendarOverlay">
        <Confetti
          colors={everyday ? ['#fbec5d', '#f90', '#f00'] : ['#fbec5d', '#f90']}
          drawShape={drawDiamond}
          width={width}
          height={height}
          numberOfPieces={everyday ? 500 : 150}
        />
      </div>
      <div id="calendarTop" className={everyday ? 'everydayIsZeaBirthday' : ''}>
        {everyday ? 'EVERYDAY IS AUGUST 29' : 'TODAY IS AUGUST 29'}
      </div>
      <div id="calendarWhatsToday">
        <p>
          Watch today's ZEA Birthday Stream!
          <iframe
            src="https://www.youtube.com/embed/Eva6LsMdBHg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
      </div>
      <div id="calendarOuter">
        {cells.map((v, i) => {
          const click = () =>
            setCells((c) => {
              c[i] = 0
              return [...c]
            })
          return (
            <div
              className={`calendarDay dayOfWeek${i % 7} ${
                v === null ? 'notThisMonth' : ''
              } ${v === 0 ? 'today' : ''}`}
              key={i}
              onClick={click}
            >
              <div className="calendarDayNumber">{v === 0 ? 29 : v}</div>
              <div className="calendarDayDescription">
                {v === 0 ? "ZEA's Birthday!!" : ''}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
