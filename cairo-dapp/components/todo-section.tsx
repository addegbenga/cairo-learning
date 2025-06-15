"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, User } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
  user: string
}

export function TodoSection() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [userAddress, setUserAddress] = useState("0x1234...5678")
  const [isLoading, setIsLoading] = useState(false)

  const addTask = async () => {
    if (!newTask.trim()) return

    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      const task: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        user: userAddress,
      }
      setTasks((prev) => [...prev, task])
      setNewTask("")
      setIsLoading(false)
    }, 500)
  }

  const toggleTask = async (taskId: number) => {
    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
      setIsLoading(false)
    }, 500)
  }

  const deleteTask = async (taskId: number) => {
    setIsLoading(true)
    // Simulate contract call
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="w-4 h-4" />
            Current User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder="User address" />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} disabled={isLoading || !newTask.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-slate-500">
              No tasks yet. Add your first task above!
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                  <span className={task.completed ? "line-through text-slate-500" : ""}>{task.text}</span>
                  {task.completed && <Badge variant="secondary">Done</Badge>}
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contract Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">add_task(user, task)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">mark_done(task_id)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">delete_task(task_id)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">get_tasks(user)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
