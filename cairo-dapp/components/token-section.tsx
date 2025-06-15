"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Coins, Send, Plus } from "lucide-react"

interface Balance {
  address: string
  amount: number
}

export function TokenSection() {
  const [balances, setBalances] = useState<Balance[]>([
    { address: "0x1234...5678", amount: 1000 },
    { address: "0x9876...5432", amount: 500 },
  ])
  const [mintAddress, setMintAddress] = useState("")
  const [mintAmount, setMintAmount] = useState("")
  const [transferFrom, setTransferFrom] = useState("0x1234...5678")
  const [transferTo, setTransferTo] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [balanceAddress, setBalanceAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const mint = async () => {
    if (!mintAddress || !mintAmount) return

    setIsLoading(true)
    setTimeout(() => {
      const amount = Number.parseFloat(mintAmount)
      setBalances((prev) => {
        const existing = prev.find((b) => b.address === mintAddress)
        if (existing) {
          return prev.map((b) => (b.address === mintAddress ? { ...b, amount: b.amount + amount } : b))
        } else {
          return [...prev, { address: mintAddress, amount }]
        }
      })
      setMintAddress("")
      setMintAmount("")
      setIsLoading(false)
    }, 500)
  }

  const transfer = async () => {
    if (!transferFrom || !transferTo || !transferAmount) return

    const amount = Number.parseFloat(transferAmount)
    const fromBalance = balances.find((b) => b.address === transferFrom)

    if (!fromBalance || fromBalance.amount < amount) {
      alert("Insufficient balance!")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setBalances((prev) => {
        let updated = prev.map((b) => (b.address === transferFrom ? { ...b, amount: b.amount - amount } : b))

        const toBalance = updated.find((b) => b.address === transferTo)
        if (toBalance) {
          updated = updated.map((b) => (b.address === transferTo ? { ...b, amount: b.amount + amount } : b))
        } else {
          updated.push({ address: transferTo, amount })
        }

        return updated
      })
      setTransferTo("")
      setTransferAmount("")
      setIsLoading(false)
    }, 500)
  }

  const getBalance = (address: string) => {
    const balance = balances.find((b) => b.address === address)
    return balance ? balance.amount : 0
  }

  const totalSupply = balances.reduce((sum, balance) => sum + balance.amount, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Coins className="w-4 h-4" />
            Token Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{totalSupply.toLocaleString()}</div>
              <div className="text-sm text-slate-500">Total Supply</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{balances.length}</div>
              <div className="text-sm text-slate-500">Holders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Mint Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mint-address">Address</Label>
              <Input
                id="mint-address"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="mint-amount">Amount</Label>
              <Input
                id="mint-amount"
                type="number"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                placeholder="0"
              />
            </div>
            <Button onClick={mint} disabled={isLoading} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Mint Tokens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Transfer Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="transfer-from">From</Label>
              <Input
                id="transfer-from"
                value={transferFrom}
                onChange={(e) => setTransferFrom(e.target.value)}
                placeholder="0x..."
              />
              <div className="text-xs text-slate-500 mt-1">Balance: {getBalance(transferFrom).toLocaleString()}</div>
            </div>
            <div>
              <Label htmlFor="transfer-to">To</Label>
              <Input
                id="transfer-to"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="transfer-amount">Amount</Label>
              <Input
                id="transfer-amount"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="0"
              />
            </div>
            <Button onClick={transfer} disabled={isLoading} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Transfer
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Check Balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={balanceAddress}
              onChange={(e) => setBalanceAddress(e.target.value)}
              placeholder="Enter address to check balance..."
            />
            <Button variant="outline">Check</Button>
          </div>
          {balanceAddress && (
            <div className="p-3 bg-slate-50 rounded">
              <div className="font-mono text-sm">{balanceAddress}</div>
              <div className="font-bold">{getBalance(balanceAddress).toLocaleString()} tokens</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">All Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {balances.map((balance, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                <span className="font-mono text-sm">{balance.address}</span>
                <Badge variant="outline">{balance.amount.toLocaleString()} tokens</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contract Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">mint(address, amount)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">transfer(to, amount)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">balance_of(address)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
