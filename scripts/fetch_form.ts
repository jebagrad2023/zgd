const axios = require('axios')
const csv = require('csv/sync')
const fsPromise = require('node:fs/promises')
const rateLimit = require('axios-rate-limit')

const MESSAGES_CSV_URL = process.env.MESSAGES_CSV_URL
if (!MESSAGES_CSV_URL) {
  throw new Error('MESSAGES_CSV_URL not provided')
}

const http = rateLimit(axios.create(), {
  maxRequests: 2,
})

const imagesDir = 'public/messages'
const regexpDriveId = /^.*\?id=([-_a-zA-Z0-9]*)$/

type Message = {
  text: string
  name: string
  image?: string
}

const getImage = async (id: string) => {
  if (!id) {
    return null
  }
  const driveUrl = `https://drive.google.com/uc?id=${id}&export=download`
  const res = await http.get(driveUrl, { responseType: 'arraybuffer' })
  await fsPromise.writeFile(`${imagesDir}/${id}`, res.data)
  return `messages/${id}`
}

const main = async () => {
  await fsPromise.mkdir(imagesDir, { recursive: true })

  const res = await http.get(MESSAGES_CSV_URL)
  const data = csv.parse(res.data) as string[][]
  const messages = await Promise.all(
    data.map(async (d, i) => {
      if (i === 0) {
        return null
      }
      const id = (() => {
        if (d[3] === '') {
          return null
        }
        const dd = regexpDriveId.exec(d[3])
        if (!dd || dd.length != 2) {
          return null
        }
        return dd[1]
      })()
      if (d[4] !== 'Ready to publish') {
        return null
      }
      return {
        name: d[1],
        text: d[2],
        image: await getImage(id),
      }
    }),
  )
  console.log(JSON.stringify(messages.filter((d) => d)))
}

main()
