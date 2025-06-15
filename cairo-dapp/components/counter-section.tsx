"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, RotateCcw } from "lucide-react"

export function CounterSection() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleIncrement = async () => {
    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      setCount((prev) => prev + 1)
      setIsLoading(false)
    }, 500)
  }

  const handleDecrement = async () => {
    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      setCount((prev) => prev - 1)
      setIsLoading(false)
    }, 500)
  }

  const handleReset = async () => {
    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      setCount(0)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl font-bold text-slate-900 mb-2">{count}</div>
        <Badge variant="outline">Current Count</Badge>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={handleDecrement} disabled={isLoading} variant="outline" size="lg">
          <Minus className="w-4 h-4 mr-2" />
          Decrement
        </Button>
        <Button onClick={handleReset} disabled={isLoading} variant="secondary" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={handleIncrement} disabled={isLoading} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Increment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contract Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">increment()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">decrement()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">get_count()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
