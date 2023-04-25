'use client'
import { Card, AreaChart, Metric, Title } from "@tremor/react"

type Props = {
    results: Root;
}


function RainChart({ results }: Props) {
    const hourly = results?.hourly.time.map((time) =>
        new Date(time).toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
        })).slice(0, 24)
    console.log(hourly)

    const data = hourly.map((hour, index) => ({
        time: Number(hour),
        "Rain (%)": results.hourly.precipitation_probability[index],
    }))
    // console.log(data)

    const dataFormatter = (number: number) => `${number} %`
  return (
    <Card>
        <Title> Chances of Rain</Title>
        <AreaChart
         className="mt-6"
         data={data}
         showLegend
         index="time"
         categories={["Rain (%)"]}
         colors = {["blue"]}
         minValue={0}
         maxValue={100}
         valueFormatter={dataFormatter}
         yAxisWidth={40}
        />
    </Card>

  )
}

export default RainChart