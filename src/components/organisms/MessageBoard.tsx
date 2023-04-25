import React from 'react'
import useSWR from 'swr'

import { ZoomableImage } from '@zgd/components/organisms/ZoomableImage'

import { fetcher } from '@zgd/utils/fetcher'

const messagesURL =
  'https://raw.githubusercontent.com/Doramanjyu/zgd/data/messages.json'

type MessageProps = {
  name: string
  image?: string
  text: string
}

type Props = {
  messages: MessageProps[]
}

const filterTooManyNewlines = new RegExp('\\n{2,}', 'g')
const newlineSplitter = new RegExp('(\\n)')

const Message = ({ name, text, image }: MessageProps): JSX.Element => (
  <div className="message">
    {!image ? null : <ZoomableImage src={image} />}
    <div className="messageContents">
      {text
        .replace(filterTooManyNewlines, '\n\n')
        .split(newlineSplitter)
        .map((s) => (s === '\n' ? <br /> : s))}
    </div>
    <div className="messageBy">{name}</div>
  </div>
)

const MessageColumn = ({ messages }: Props): JSX.Element => (
  <div className="messageColumn">
    {messages.map((m, i) => (
      <Message name={m.name} text={m.text} image={m.image} key={i} />
    ))}
  </div>
)

export const MessageBoard = (): JSX.Element => {
  const { data: messages, error } = useSWR<MessageProps[], string>(
    messagesURL,
    fetcher(),
    {
      revalidateOnFocus: false,
    },
  )

  const numColumns = 3
  const messagesPerColumn = !messages
    ? 0
    : Math.ceil(messages.length / numColumns)
  const columns = !messages
    ? []
    : Array.from(Array(numColumns).keys()).map((i) =>
        messages.slice(i * messagesPerColumn, (i + 1) * messagesPerColumn),
      )
  return (
    <div className="messageBoard">
      {!error ? null : `error: ${error.toString()}`}
      {!messages
        ? null
        : columns.map((c, i) => <MessageColumn messages={c} key={i} />)}
    </div>
  )
}
