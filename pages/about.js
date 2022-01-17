// import { useState, useEffect } from 'react'
import {
	ResponsiveContainer,
	// LineChart, Line,
	AreaChart, Area,
	PieChart, Pie,

	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from 'recharts'

import Layout from '../layout'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'


const data = [
  {	name: 'Page A', range: 4000, price: 2400, value: 2400 },
  {	name: 'Page B', range: 3000, price: 1398, value: 2210 },
  {	name: 'Page C', range: 2000, price: 9800, value: 2290 },
  {	name: 'Page D', range: 2780, price: 3908, value: 2000 },
  {	name: 'Page E', range: 1890, price: 4800, value: 2181 },
  {	name: 'Page F', range: 2390, price: 3800, value: 2500 },
  {	name: 'Page G', range: 3490, price: 4300, value: 2100 },
]


const About = () => {

	const clickHandler = (pi, index, evt) => {
		console.log({ name: pi.name, value: pi.value, data: pi.data })

	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>



			<Typography>Line Chart Title </Typography>



        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>

		</Layout>
	)
}
export default About


