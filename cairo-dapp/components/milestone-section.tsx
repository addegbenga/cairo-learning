"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Target, CheckCircle, Clock, DollarSign } from "lucide-react"

interface Milestone {
  id: number
  escrowId: number
  amount: number
  description: string
  approved: boolean
  paid: boolean
  timestamp: number
  approvalTimestamp?: number
}

export function MilestoneSection() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [escrowId, setEscrowId] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addMilestone = async () => {
    if (!escrowId || !amount || !description) return

    setIsLoading(true)
    setTimeout(() => {
      const milestone: Milestone = {
        id: Date.now(),
        escrowId: Number.parseInt(escrowId),
        amount: Number.parseFloat(amount),
        description,
        approved: false,
        paid: false,
        timestamp: Date.now(),
      }
      setMilestones((prev) => [...prev, milestone])
      setEscrowId("")
      setAmount("")
      setDescription("")
      setIsLoading(false)
    }, 500)
  }

  const approveMilestone = async (milestoneId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === milestoneId ? { ...milestone, approved: true, approvalTimestamp: Date.now() } : milestone,
        ),
      )
      setIsLoading(false)
    }, 500)
  }

  const releasePayment = async (milestoneId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setMilestones((prev) =>
        prev.map((milestone) => (milestone.id === milestoneId ? { ...milestone, paid: true } : milestone)),
      )
      setIsLoading(false)
    }, 500)
  }

  const getStatusBadge = (milestone: Milestone) => {
    if (milestone.paid) return <Badge variant="secondary">Paid</Badge>
    if (milestone.approved) return <Badge variant="default">Approved</Badge>
    return <Badge variant="outline">Pending</Badge>
  }

  const totalMilestones = milestones.length
  const approvedMilestones = milestones.filter((m) => m.approved).length
  const paidMilestones = milestones.filter((m) => m.paid).length
  const totalValue = milestones.reduce((sum, m) => sum + m.amount, 0)
  const paidValue = milestones.filter((m) => m.paid).reduce((sum, m) => sum + m.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalMilestones}</div>
            <div className="text-sm text-slate-500">Total Milestones</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{approvedMilestones}</div>
            <div className="text-sm text-slate-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{paidMilestones}</div>
            <div className="text-sm text-slate-500">Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{paidValue.toFixed(2)}</div>
            <div className="text-sm text-slate-500">ETH Paid</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add New Milestone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="escrow-id">Escrow ID</Label>
              <Input
                id="escrow-id"
                type="number"
                value={escrowId}
                onChange={(e) => setEscrowId(e.target.value)}
                placeholder="123"
              />
            </div>
            <div>
              <Label htmlFor="milestone-amount">Amount (ETH)</Label>
              <Input
                id="milestone-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="milestone-description">Description</Label>
            <Textarea
              id="milestone-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the milestone requirements..."
              rows={3}
            />
          </div>
          <Button onClick={addMilestone} disabled={isLoading} className="w-full">
            <Target className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {milestones.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-slate-500">
              No milestones created yet. Add your first milestone above!
            </CardContent>
          </Card>
        ) : (
          milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm">Milestone #{milestone.id}</CardTitle>
                    <CardDescription>Escrow #{milestone.escrowId}</CardDescription>
                  </div>
                  {getStatusBadge(milestone)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">{milestone.amount} ETH</span>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Description:</div>
                  <div className="text-sm text-slate-600">{milestone.description}</div>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Created: {new Date(milestone.timestamp).toLocaleString()}
                  {milestone.approvalTimestamp && (
                    <>
                      <span>•</span>
                      Approved: {new Date(milestone.approvalTimestamp).toLocaleString()}
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {!milestone.approved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => approveMilestone(milestone.id)}
                      disabled={isLoading}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Milestone
                    </Button>
                  )}
                  {milestone.approved && !milestone.paid && (
                    <Button size="sm" onClick={() => releasePayment(milestone.id)} disabled={isLoading}>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Release Payment
                    </Button>
                  )}
                  {milestone.paid && (
                    <Badge variant="secondary">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Payment Released
                    </Badge>
                  )}
                </div>
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
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">
              add_milestone(escrow_id, amount, description)
            </code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">approve_milestone(id)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">release_payment_if_due()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
