"use client"

import { cn } from "@/lib/utils"
import { SendHorizontal, Plus, ArrowDownLeft, Bitcoin, Coins, DollarSign, Copy, Check, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface CryptoItem {
  id: string
  name: string
  symbol: string
  balance: string
  type: "bitcoin" | "ethereum" | "litecoin" | "usd"
}

interface CryptoListProps {
  totalBalance?: string
  cryptos?: CryptoItem[]
  className?: string
}

const CRYPTOS: CryptoItem[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    balance: "1.245 BTC",
    type: "bitcoin",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    balance: "14.32 ETH",
    type: "ethereum",
  },
  {
    id: "3",
    name: "Litecoin",
    symbol: "LTC",
    balance: "30.5 LTC",
    type: "litecoin",
  },
  {
    id: "4",
    name: "USD Balance",
    symbol: "USD",
    balance: "$5,230.00",
    type: "usd",
  },
  {
    id: "5",
    name: "USD Balance",
    symbol: "USD",
    balance: "$5,230.00",
    type: "usd",
  },
]

export default function CryptoList({ cryptos = CRYPTOS, className }: CryptoListProps) {
  const getCryptoIcon = (type: string) => {
    switch (type) {
      case "bitcoin":
        return <Bitcoin className="w-5 h-5 text-amber-500" />
      case "ethereum":
        return <Coins className="w-5 h-5 text-indigo-400" />
      case "litecoin":
        return <Coins className="w-5 h-5 text-blue-400" />
      case "usd":
        return <DollarSign className="w-5 h-5 text-green-500" />
      default:
        return <Coins className="w-5 h-5 text-zinc-400" />
    }
  }

  const [modalType, setModalType] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoItem | null>(null)
  const [amount, setAmount] = useState<string>("")
  const [recipient, setRecipient] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

  const handleCryptoClick = (crypto: CryptoItem) => {
    setSelectedCrypto(crypto)
    setDetailsOpen(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    // Mock send functionality
    alert(`Mock transaction: Sending ${amount} ${selectedCrypto?.symbol || "crypto"} to ${recipient}`)
    setModalType(null)
    setAmount("")
    setRecipient("")
  }

  const handleBuy = () => {
    // Mock buy functionality
    alert(`Mock purchase: Buying ${amount} ${selectedCrypto?.symbol || "crypto"}`)
    setModalType(null)
    setAmount("")
  }

  const walletAddress = "0x1234abcd5678efgh9012ijkl3456mnop7890"

  return (
    <div className={cn("w-full mx-auto flex flex-col h-full", "bg-[#101010]", "rounded-none shadow-md", className)}>
      <div className="p-5 border-b border-[#1F1F23]">
        <p className="text-sm font-medium text-zinc-300">Balances</p>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-0.5">
          {cryptos.map((crypto, index) => (
            <div
              key={crypto.id}
              className={cn(
                "group flex items-center justify-between",
                "p-3",
                "hover:bg-[#151518] cursor-pointer",
                "transition-all duration-200",
                index !== cryptos.length - 1 && "border-b border-[#1F1F23]/40",
              )}
              onClick={() => handleCryptoClick(crypto)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                  {getCryptoIcon(crypto.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">{crypto.name}</h3>
                  <p className="text-xs text-zinc-500">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-zinc-100">{crypto.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1F1F23] mt-auto">
        <div className="grid grid-cols-3 gap-0">
          <Button
            onClick={() => setModalType("buy")}
            variant="ghost"
            className="flex border-[#1F1F23] border-0 border-r rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Buy</span>
          </Button>
          <Button
            onClick={() => setModalType("send")}
            variant="ghost"
            className="flex border-[#1F1F23] border-0 border-r rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <SendHorizontal className="w-4 h-4" />
            <span>Send</span>
          </Button>
          <Button
            onClick={() => setModalType("receive")}
            variant="ghost"
            className="flex border-[#1F1F23] border-0 rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Receive</span>
          </Button>
        </div>
      </div>

      {/* Buy Modal */}
      <Dialog open={modalType === "buy"} onOpenChange={() => modalType === "buy" && setModalType(null)}>
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Buy Crypto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="crypto-select">Select Cryptocurrency</Label>
              <Select onValueChange={(value) => setSelectedCrypto(cryptos.find((c) => c.id === value) || null)}>
                <SelectTrigger className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5">{getCryptoIcon(crypto.type)}</div>
                        <span>{crypto.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleBuy}
              disabled={!selectedCrypto || !amount}
              className="w-full bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              Buy {selectedCrypto?.symbol}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Modal */}
      <Dialog open={modalType === "send"} onOpenChange={() => modalType === "send" && setModalType(null)}>
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Send Crypto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="crypto-select">Select Cryptocurrency</Label>
              <Select onValueChange={(value) => setSelectedCrypto(cryptos.find((c) => c.id === value) || null)}>
                <SelectTrigger className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5">{getCryptoIcon(crypto.type)}</div>
                        <span>{crypto.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="send-amount">Amount</Label>
              <Input
                id="send-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSend}
              disabled={!selectedCrypto || !amount || !recipient}
              className="w-full bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              Send {selectedCrypto?.symbol}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receive Modal */}
      <Dialog open={modalType === "receive"} onOpenChange={() => modalType === "receive" && setModalType(null)}>
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Receive Crypto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 flex flex-col items-center">
            <div className="bg-white p-4 rounded-none">
              <QrCode className="w-32 h-32 text-black" />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="wallet-address">Your Wallet Address</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="wallet-address"
                  value={walletAddress}
                  readOnly
                  className="bg-[#18181C] border-[#1F1F23] text-zinc-100 font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(walletAddress)}
                  className="bg-[#18181C] border-[#1F1F23] text-zinc-100 hover:bg-[#232328]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Crypto Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-3">
              {selectedCrypto && (
                <>
                  <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                    {getCryptoIcon(selectedCrypto.type)}
                  </div>
                  {selectedCrypto.name}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedCrypto && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Symbol</span>
                <span className="text-zinc-100 font-medium">{selectedCrypto.symbol}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Balance</span>
                <span className="text-zinc-100 font-medium">{selectedCrypto.balance}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">USD Value</span>
                <span className="text-zinc-100 font-medium">
                  {selectedCrypto.type === "bitcoin"
                    ? "$81,245.00"
                    : selectedCrypto.type === "ethereum"
                      ? "$45,108.00"
                      : selectedCrypto.type === "litecoin"
                        ? "$4,575.00"
                        : selectedCrypto.type === "usd"
                          ? selectedCrypto.balance
                          : "$0.00"}
                </span>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2">
            <Button
              onClick={() => {
                setDetailsOpen(false)
                setSelectedCrypto(selectedCrypto)
                setModalType("send")
              }}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              <SendHorizontal className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button
              onClick={() => {
                setDetailsOpen(false)
                setSelectedCrypto(selectedCrypto)
                setModalType("receive")
              }}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              <ArrowDownLeft className="w-4 h-4 mr-2" />
              Receive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

