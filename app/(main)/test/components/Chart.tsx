import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const DataTable = () => {
  // Mocked table data (replace with your own data fetching logic)
  const tableData = [
    { createdAt: '2023-09-01', price: 10 },
    { createdAt: '2023-09-05', price: 15 },
    { createdAt: '2023-09-10', price: 8 },
    // ... more data ...
  ]

  // Filter data for the last recent month
  const currentDate = new Date() // Get current date
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  ) // Calculate the first day of the last month
  const filteredData = tableData.filter(
    (entry) => new Date(entry.createdAt) >= lastMonthDate
  )

  // Prepare data for Recharts
  const chartData = filteredData.map((entry) => ({
    date: entry.createdAt, // Assuming createdAt is in 'YYYY-MM-DD' format
    price: entry.price,
  }))

  return (
    <LineChart width={500} height={300} data={chartData}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='createdAt' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='price' stroke='#8884d8' />
    </LineChart>
  )
}

export default DataTable
