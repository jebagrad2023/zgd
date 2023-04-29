import React, { useState, useEffect, useCallback } from 'react'

const beaEyePattern = [
  ...Array(80).fill('open'),
  'none',
  ...Array(2).fill('close'),
  'none',
]

type ChatData = {
  match: RegExp
  output: string[]
}

const chatDatabase: ChatData[] = [
  { match: /apa\s*kabar/i, output: ['B aja'] },
  { match: /h[ae][lm]?lo/i, output: ['Hemlo'] },
]

const randInt = (v: number) => Math.floor(Math.random() * v)

const beaTextTimeout = 10000
const initialBEAText = 'May BEA help u?'

export const BEAChatBot = (): JSX.Element => {
  const [eye, setEye] = useState('open')
  const [mouth] = useState('v')
  const [yourText, setYourText] = useState('')
  const [beaText, setBeaText] = useState('...')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [beaTextStamp, setBeaTextStamp] = useState<number>()

  const answer = useCallback(
    (s: string, wait: number, onDone?: () => void) => {
      if (wait > 0) {
        setBeaText('...')
      }
      setTimeout(() => {
        let i = 0
        const textAppearTimer = setInterval(() => {
          i++
          if (i >= s.length) {
            setBeaText(s)
            if (onDone) {
              onDone()
            }
            setInputDisabled(false)
            clearInterval(textAppearTimer)
            return
          }
          setBeaText(s.slice(0, i))
        }, 100)
      }, wait)
    },
    [setBeaText, setInputDisabled],
  )

  useEffect(() => {
    let cnt = 0
    const timer = setInterval(() => {
      cnt++
      setEye(beaEyePattern[cnt % beaEyePattern.length])
    }, 100)
    answer(initialBEAText, 2500)
    return () => clearInterval(timer)
  }, [answer])

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        beaTextStamp &&
        beaTextStamp + beaTextTimeout < new Date().getTime()
      ) {
        setYourText('')
        setBeaTextStamp(null)
        answer(initialBEAText, 1000)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [answer, beaTextStamp])

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const el = e.target as HTMLInputElement
      setYourText(`"${el.value}"`)
      setInputDisabled(true)

      const pat = chatDatabase.find((d) => el.value.match(d.match))
      const text = pat
        ? pat.output[randInt(pat.output.length)]
        : "Hmm... BEA don't understand"
      answer(text, 1000 + randInt(2000), () =>
        setBeaTextStamp(new Date().getTime()),
      )
      el.value = ''
    }
  }

  return (
    <>
      <div id="chatBox">
        {yourText && <div id="yourText">{yourText}</div>}
        <div id="beaText">{beaText}</div>
        <input
          type="text"
          placeholder="type here"
          onKeyPress={onKeyPress}
          pattern="^[-0-9a-zA-Z?! ]*$"
          disabled={inputDisabled}
        />
        <div id="bubbleTail" />
      </div>
      <div id="beaChatBot">
        <div id="beaChatBotOverlay" data-eye={eye} />
        <div id="beaChatBotOverlay" data-mouth={mouth} />
      </div>
    </>
  )
}
