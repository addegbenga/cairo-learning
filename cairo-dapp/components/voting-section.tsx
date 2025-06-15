"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Vote, Trophy, Plus } from "lucide-react"

interface Proposal {
  id: number
  description: string
  votes: number
  timestamp: number
  active: boolean
}

export function VotingSection() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [newProposal, setNewProposal] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [votedProposals, setVotedProposals] = useState<Set<number>>(new Set())

  const createProposal = async () => {
    if (!newProposal.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      const proposal: Proposal = {
        id: Date.now(),
        description: newProposal,
        votes: 0,
        timestamp: Date.now(),
        active: true,
      }
      setProposals((prev) => [...prev, proposal])
      setNewProposal("")
      setIsLoading(false)
    }, 500)
  }

  const vote = async (proposalId: number) => {
    if (votedProposals.has(proposalId)) return

    setIsLoading(true)
    setTimeout(() => {
      setProposals((prev) =>
        prev.map((proposal) => (proposal.id === proposalId ? { ...proposal, votes: proposal.votes + 1 } : proposal)),
      )
      setVotedProposals((prev) => new Set([...prev, proposalId]))
      setIsLoading(false)
    }, 500)
  }

  const getWinner = () => {
    if (proposals.length === 0) return null
    return proposals.reduce((winner, current) => (current.votes > winner.votes ? current : winner))
  }

  const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.votes, 0)
  const winner = getWinner()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Create New Proposal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="proposal">Proposal Description</Label>
            <Input
              id="proposal"
              value={newProposal}
              onChange={(e) => setNewProposal(e.target.value)}
              placeholder="Describe your proposal..."
              onKeyDown={(e) => e.key === "Enter" && createProposal()}
            />
          </div>
          <Button onClick={createProposal} disabled={isLoading || !newProposal.trim()} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Button>
        </CardContent>
      </Card>

      {winner && totalVotes > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              Current Winner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">{winner.description}</div>
            <div className="text-sm text-slate-600 mt-1">
              {winner.votes} votes ({Math.round((winner.votes / totalVotes) * 100)}%)
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {proposals.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-slate-500">
              No proposals yet. Create your first proposal above!
            </CardContent>
          </Card>
        ) : (
          proposals.map((proposal) => {
            const votePercentage = totalVotes > 0 ? (proposal.votes / totalVotes) * 100 : 0
            const hasVoted = votedProposals.has(proposal.id)

            return (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm mb-2">{proposal.description}</CardTitle>
                      <div className="text-xs text-slate-500">
                        Created: {new Date(proposal.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <Badge variant={proposal.active ? "default" : "secondary"}>
                      {proposal.active ? "Active" : "Closed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Votes: {proposal.votes}</span>
                      <span>{votePercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={votePercentage} className="h-2" />
                  </div>

                  <Button
                    size="sm"
                    onClick={() => vote(proposal.id)}
                    disabled={isLoading || hasVoted || !proposal.active}
                    variant={hasVoted ? "secondary" : "default"}
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    {hasVoted ? "Voted" : "Vote"}
                  </Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contract Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">create_proposal(description)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">vote(proposal_id)</code>
            <Badge variant="secondary">✅</Badge>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">get_winner()</code>
            <Badge variant="secondary">✅</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
