import React from 'react'

type MessageProps = {
  name: string
  image?: string
  text: string
}

type Props = {
  messages: MessageProps[]
}

const Message = ({ name, text, image }: MessageProps): JSX.Element => (
  <div className="message">
    {!image ? null : <img src={image} />}
    <div className="messageContents">{text}</div>
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

export const MessageBoard = ({ messages }: Props): JSX.Element => {
  const numColumns = 3
  const messagesPerColumn = Math.ceil(messages.length / numColumns)
  const columns = Array.from(Array(numColumns).keys()).map((i) =>
    messages.slice(i * messagesPerColumn, (i + 1) * messagesPerColumn),
  )
  return (
    <div className="messageBoard">
      {columns.map((c, i) => (
        <MessageColumn messages={c} key={i} />
      ))}
    </div>
  )
}
