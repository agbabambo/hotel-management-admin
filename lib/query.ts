import { v4 as uuid } from 'uuid'
import queryString from 'query-string'
import { DateRange } from 'react-day-picker'

// TODO: Fix later
type RoomResInfo = {
  adults: number
  kids: number
  id: string
}

export const convertObjToQuery = (roomsInfo: RoomResInfo[]): string => {
  let query = ''
  roomsInfo.forEach((r, i) => {
    if (r.adults > 0) query += `&room${i + 1}numAdults=${r.adults}`
    if (r.kids > 0) query += `&room${i + 1}numKids=${r.kids}`
  })
  return query
}

export const convertQueryToObj = (query: string): RoomResInfo[] => {
  let roomCount: RoomResInfo[] = []

  const queryObj = queryString.parse(query.slice(query.search('room1')))

  const parsedRoom: number[] = []

  Object.keys(queryObj).forEach((key) => {
    const roomNum = +key.split('num')[0].slice(4)
    if (parsedRoom.find((i) => i === roomNum)) return
    else parsedRoom.push(roomNum)

    const adults = queryObj[`room${roomNum}numAdults`]
      ? Number(queryObj[`room${roomNum}numAdults`])
      : 1
    const kids = queryObj[`room${roomNum}numKids`]
      ? Number(queryObj[`room${roomNum}numKids`])
      : 0

    const roomGuestItem: RoomResInfo = {
      adults,
      kids,
      id: uuid(),
    }

    roomCount.push(roomGuestItem)
  })

  return roomCount
}

export const toUrlQuery = (
  baseUrl: string,
  date: DateRange,
  roomResInfo: RoomResInfo[]
): string => {
  let query: any = {}

  query = {
    arrivalDate: date.from?.toLocaleDateString().split('/').join('-'),
    departureDate: date.to?.toLocaleDateString().split('/').join('-'),
  }
  let url = queryString.stringifyUrl({ url: baseUrl, query })
  url += convertObjToQuery(roomResInfo)

  return url
}

export const toObject = (
  params: string
): { roomResInfos: RoomResInfo[]; date: DateRange } => {
  let query: any = {}

  query = queryString.parse(params.toString())
  const arrivalDate: Date = query.arrivalDate
    ? new Date(query.arrivalDate)
    : new Date()
  const departureDate = query.departureDate
    ? new Date(query.departureDate)
    : new Date()
  const roomResInfos: RoomResInfo[] = convertQueryToObj(params.toString())

  const date: DateRange = {
    from: arrivalDate,
    to: departureDate,
  }

  return { roomResInfos, date }
}
