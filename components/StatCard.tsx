'use client'

import { Card, Metric, Text, Color } from "@tremor/react"

type Props = {
    title: string;
    metric: string;
    color: Color;
    // color?: | "indigo" | "slate" | "gray" | "zinc" | "neautral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | undefined;
}

function StatCard({title, metric, color}: Props) {
  return (
    <Card decorationColor={color} decoration="top">
      <Text>{title}</Text>
      <Metric> {metric}</Metric>
    </Card>
  )
}

export default StatCard