"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CounterSection } from "@/components/counter-section"
import { TodoSection } from "@/components/todo-section"
import { EscrowSection } from "@/components/escrow-section"
import { VotingSection } from "@/components/voting-section"
import { TokenSection } from "@/components/token-section"
import { MilestoneSection } from "@/components/milestone-section"
import { Calculator, CheckSquare, Shield, Vote, Coins, Target } from "lucide-react"

export default function BlockchainDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Blockchain Learning Dashboard</h1>
          <p className="text-slate-600 text-lg">Master smart contract development through hands-on practice</p>
        </div>

        <Tabs defaultValue="counter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="counter" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Counter</span>
            </TabsTrigger>
            <TabsTrigger value="todo" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">TODO</span>
            </TabsTrigger>
            <TabsTrigger value="escrow" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Escrow</span>
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <Vote className="w-4 h-4" />
              <span className="hidden sm:inline">Voting</span>
            </TabsTrigger>
            <TabsTrigger value="token" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              <span className="hidden sm:inline">Token</span>
            </TabsTrigger>
            <TabsTrigger value="milestone" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Milestones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="counter">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  On-Chain Counter
                  <Badge variant="secondary">Hello World</Badge>
                </CardTitle>
                <CardDescription>Learn storage, read, write, get_caller_address, and events</CardDescription>
              </CardHeader>
              <CardContent>
                <CounterSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="todo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  Simple TODO List
                  <Badge variant="secondary">Map-Based</Badge>
                </CardTitle>
                <CardDescription>Store and retrieve user-specific tasks with unique IDs</CardDescription>
              </CardHeader>
              <CardContent>
                <TodoSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escrow">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Escrow Lite
                  <Badge variant="secondary">Multi-Role</Badge>
                </CardTitle>
                <CardDescription>Simulate core escrow functionality with multiple roles and state flow</CardDescription>
              </CardHeader>
              <CardContent>
                <EscrowSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  Voting App
                  <Badge variant="secondary">Proposals</Badge>
                </CardTitle>
                <CardDescription>Create and vote on proposals with timestamp-based logic</CardDescription>
              </CardHeader>
              <CardContent>
                <VotingSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="token">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Simple Token
                  <Badge variant="secondary">ERC-20 Minimal</Badge>
                </CardTitle>
                <CardDescription>Build your own basic token with mint, transfer, and balance functions</CardDescription>
              </CardHeader>
              <CardContent>
                <TokenSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestone">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Milestone Tracker
                  <Badge variant="secondary">Linked to Escrow</Badge>
                </CardTitle>
                <CardDescription>Build milestone approval logic with time checks and payment releases</CardDescription>
              </CardHeader>
              <CardContent>
                <MilestoneSection />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
