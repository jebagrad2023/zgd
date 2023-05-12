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
        .map((s, i) => (s === '\n' ? <br key={`br${i}`} /> : s))}
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

  const col1 = 58
  const col2 = 49
  const columns = !messages
    ? []
    : [
        messages.slice(0, col1),
        messages.slice(col1, col1 + col2),
        messages.slice(col1 + col2),
      ]
  return (
    <>
      <div id="messageBoard">
        {!error ? null : `error: ${error.toString()}`}
        {!messages
          ? null
          : columns.map((c, i) => <MessageColumn messages={c} key={i} />)}
      </div>
      <div id="messageBoardFooter">Terima kasih!</div>
    </>
  )
}
