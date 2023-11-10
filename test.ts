import { format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

const today = new Date()

const bookings = [
  { roomCharge: 111, createdAt: new Date() },
  { roomCharge: 222, createdAt: new Date() },
  { roomCharge: 333, createdAt: new Date() },
  { roomCharge: 444, createdAt: new Date() },
  { roomCharge: 555, createdAt: new Date() },
  { roomCharge: 666, createdAt: new Date() },
  { roomCharge: 777, createdAt: new Date() },
  { roomCharge: 888, createdAt: new Date() },
  { roomCharge: 999, createdAt: new Date() },
  { roomCharge: 1000, createdAt: new Date() },
  { roomCharge: 1111, createdAt: new Date() },
  { roomCharge: 1222, createdAt: new Date() },
  { roomCharge: 1333, createdAt: new Date() },
  { roomCharge: 1444, createdAt: new Date() },
]

bookings[0].createdAt.setDate(today.getDate() - 1)
bookings[1].createdAt.setDate(today.getDate() - 2)
bookings[2].createdAt.setDate(today.getDate() - 2)
bookings[3].createdAt.setDate(today.getDate() - 5)
bookings[4].createdAt.setDate(today.getDate() - 5)
bookings[5].createdAt.setDate(today.getDate() - 6)
bookings[6].createdAt.setDate(today.getDate() - 7)
bookings[7].createdAt.setDate(today.getDate() - 8)
bookings[8].createdAt.setDate(today.getDate() - 9)
bookings[9].createdAt.setDate(today.getDate() - 9)
bookings[10].createdAt.setDate(today.getDate() - 9)
bookings[11].createdAt.setDate(today.getDate() - 12)
bookings[12].createdAt.setDate(today.getDate() - 12)
bookings[13].createdAt.setDate(today.getDate() - 14)

type ChartData = {
  curr: number
  prev: number
  date: string
}

const get7DayChartData = (): ChartData[] => {
  const chartData: ChartData[] = []

  Array(7)
    .fill(null)
    .forEach((_, i) => {
      const today = new Date()
      today.setDate(today.getDate() - (i + 1))
      const date = today.toDateString()
      today.setDate(today.getDate() - 7)
      const dateMinus7 = today.toDateString()

      const totalOfCurDate = bookings
        .filter((b) => b.createdAt.toDateString() === date)
        .reduce((p, c) => c.roomCharge + p, 0)

      const totalOfCurDateMinus7 = bookings
        .filter((b) => b.createdAt.toDateString() === dateMinus7)
        .reduce((p, c) => p + c.roomCharge, 0)

      chartData.push({ date, curr: totalOfCurDate, prev: totalOfCurDateMinus7 })
    })

  chartData.forEach((data) => {
    data.date = format(new Date(data.date), 'EEE', { locale: enUS })
  })

  return chartData
}

// const getYearChartData = (): ChartData[] => {}

const formattedData: ChartData[] = get7DayChartData()

console.log(formattedData)
