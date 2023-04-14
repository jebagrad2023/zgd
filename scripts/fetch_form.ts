const axios = require('axios')
const csv = require('csv/sync')

const MESSAGES_CSV_URL = process.env.MESSAGES_CSV_URL
if (!MESSAGES_CSV_URL) {
  throw new Error('MESSAGES_CSV_URL not provided')
}

const regexpDriveId = /^.*\?id=(.*)$/

type Message = {
  text: string
  name: string
  image?: string
}

const main = async () => {
  const res = await axios.get(MESSAGES_CSV_URL)
  const data = csv.parse(res.data) as string[][]
  const messages = data
    .map((d, i) => {
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
      return {
        name: d[1],
        text: d[2],
        image: !id
          ? null
          : `https://drive.google.com/uc?id=${id}&export=download`,
      }
    })
    .filter((d) => d)
  console.log(JSON.stringify(messages))
}

main()
