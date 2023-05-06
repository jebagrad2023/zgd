import React, { useState, useEffect, useCallback } from 'react'

type ChatData = {
  match: RegExp
  output: string[]
}

const chatDatabase: ChatData[] = [
  { match: /apa\s*kabar/i, output: ['B aja'] },
  { match: /h[ae][lm]?lo/i, output: ['Hemlo'] },
  {
    match: /[zj]eb?a/i,
    output: [
      'Here lies ZEA Cornelia',
      'She was the amazingly sweet and talented automaton',
      '4ever in our heart',
    ],
  },
  { match: /bea/i, output: ['Heh', 'Here BEA am'] },
  { match: /what'?s?\s*pop+ing?/i, output: ["What's poppin!"] },
]

const cmdRegexp = {
  sleep: /sle(ep|b)/i,
  awake: /aw[ea]ke?/i,
}

const randInt = (v: number) => Math.floor(Math.random() * v)

const beaTextTimeout = 10000
const autoSleepTimeout = 600000
const initialBEAText = 'May BEA help u?'

export const BEAChatBot = (): JSX.Element => {
  const [beaState, setBeaState] = useState('normal')
  const [yourText, setYourText] = useState('')
  const [beaText, setBeaText] = useState('...')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [beaTextStamp, setBeaTextStamp] = useState<number>()
  const [lastInputStamp, setLastInputStamp] = useState<number>(
    new Date().getTime(),
  )

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

  useEffect(() => answer(initialBEAText, 2500), [answer])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      if (beaTextStamp && beaTextStamp + beaTextTimeout < now) {
        setYourText('')
        setBeaTextStamp(null)
        answer(initialBEAText, 1000)
      }
      if (beaState !== 'sleep' && lastInputStamp + autoSleepTimeout < now) {
        setYourText('')
        setBeaTextStamp(null)
        answer('Zzz...', 1000, () => setBeaState('sleep'))
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [answer, beaTextStamp, autoSleepTimeout, beaState])

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const el = e.target as HTMLInputElement
      setInputDisabled(true)

      setLastInputStamp(new Date().getTime())

      if (el.value.match(cmdRegexp.awake)) {
        setYourText('')
        setBeaTextStamp(null)
        answer(initialBEAText, 1000)
        setBeaState('normal')
        el.value = ''
        return
      }
      if (beaState === 'sleep' || el.value.match(cmdRegexp.sleep)) {
        setYourText('')
        setBeaTextStamp(null)
        answer('Zzz...', 1000, () => setBeaState('sleep'))
        el.value = ''
        return
      }

      setYourText(`"${el.value}"`)

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

  const currentEye = (() => {
    switch (beaState) {
      case 'sleep':
        return 'zzz'
      default:
        return 'default'
    }
  })()
  const currentMouth = (() => {
    switch (beaState) {
      case 'sleep':
        return 'zzz'
      default:
        return 'default'
    }
  })()

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
        <div id="beaChatBotOverlay" data-eye={currentEye} />
        <div id="beaChatBotOverlay" data-mouth={currentMouth} />
      </div>
    </>
  )
}
