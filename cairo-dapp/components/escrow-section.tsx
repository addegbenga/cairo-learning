"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Shield, DollarSign, CheckCircle, ArrowRight } from "lucide-react"

interface Escrow {
  id: number
  depositor: string
  beneficiary: string
  amount: number
  funded: boolean
  approved: boolean
  released: boolean
  status: "created" | "funded" | "approved" | "released"
}

export function EscrowSection() {
  const [escrows, setEscrows] = useState<Escrow[]>([])
  const [depositor, setDepositor] = useState("0x1234...5678")
  const [beneficiary, setBeneficiary] = useState("0x9876...5432")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const createEscrow = async () => {
    if (!amount || !depositor || !beneficiary) return

    setIsLoading(true)
    setTimeout(() => {
      const escrow: Escrow = {
        id: Date.now(),
        depositor,
        beneficiary,
        amount: Number.parseFloat(amount),
        funded: false,
        approved: false,
        released: false,
        status: "created",
      }
      setEscrows((prev) => [...prev, escrow])
      setAmount("")
      setIsLoading(false)
    }, 500)
  }

  const fundEscrow = async (escrowId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setEscrows((prev) =>
        prev.map((escrow) => (escrow.id === escrowId ? { ...escrow, funded: true, status: "funded" } : escrow)),
      )
      setIsLoading(false)
    }, 500)
  }

  const approveRelease = async (escrowId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setEscrows((prev) =>
        prev.map((escrow) => (escrow.id === escrowId ? { ...escrow, approved: true, status: "approved" } : escrow)),
      )
      setIsLoading(false)
    }, 500)
  }

  const releaseFunds = async (escrowId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setEscrows((prev) =>
        prev.map((escrow) => (escrow.id === escrowId ? { ...escrow, released: true, status: "released" } : escrow)),
      )
      setIsLoading(false)
    }, 500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "secondary"
      case "funded":
        return "default"
      case "approved":
        return "outline"
      case "released":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Create New Escrow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="depositor">Depositor Address</Label>
              <Input
                id="depositor"
                value={depositor}
                onChange={(e) => setDepositor(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="beneficiary">Beneficiary Address</Label>
              <Input
                id="beneficiary"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="0x..."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.01"
            />
          </div>
          <Button onClick={createEscrow} disabled={isLoading} className="w-full">
            <Shield className="w-4 h-4 mr-2" />
            Create Escrow
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {escrows.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-slate-500">
              No escrows created yet. Create your first escrow above!
            </CardContent>
          </Card>
        ) : (
          escrows.map((escrow) => (
            <Card key={escrow.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm">Escrow #{escrow.id}</CardTitle>
                  <Badge variant={getStatusColor(escrow.status)}>{escrow.status.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Depositor:</span>
                    <div className="font-mono">{escrow.depositor}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Beneficiary:</span>
                    <div className="font-mono">{escrow.beneficiary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">{escrow.amount} ETH</span>
                </div>

                <div className="flex gap-2">
                  {!escrow.funded && (
                    <Button size="sm" onClick={() => fundEscrow(escrow.id)} disabled={isLoading}>
                      Fund Escrow
                    </Button>
                  )}
                  {escrow.funded && !escrow.approved && (
                    <Button size="sm" variant="outline" onClick={() => approveRelease(escrow.id)} disabled={isLoading}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Release
                    </Button>
                  )}
                  {escrow.approved && !escrow.released && (
                    <Button size="sm" onClick={() => releaseFunds(escrow.id)} disabled={isLoading}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Release Funds
                    </Button>
                  )}
                  {escrow.released && (
                    <Badge variant="secondary">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
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
              create_escrow(depositor, beneficiary, amount)
            </code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">fund_escrow()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">approve_release()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">release_funds()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
