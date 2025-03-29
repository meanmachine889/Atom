"use client"

import { cn } from "@/lib/utils"
import { Wallet, Plus, Copy, Shield, Landmark, HardDrive, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletItem {
  id: string
  name: string
  address: string
  type: "primary" | "secondary" | "exchange" | "hardware"
}

interface WalletListProps {
  wallets?: WalletItem[]
  className?: string
}

const WALLETS: WalletItem[] = [
  {
    id: "1",
    name: "Account 1",
    address: "0xAbc123...456Def",
    type: "primary",
  },
  {
    id: "2",
    name: "Account 2",
    address: "0xDef456...789Ghi",
    type: "secondary",
  },
  {
    id: "3",
    name: "Account 3",
    address: "0xGhi789...012Jkl",
    type: "exchange",
  },
  {
    id: "4",
    name: "Account 4",
    address: "0xJkl012...345Mno",
    type: "hardware",
  },
]

export default function WalletList({ wallets = WALLETS, className }: WalletListProps) {
  // Function to get the appropriate icon based on wallet type
  const getWalletIcon = (type: string) => {
    switch (type) {
      case "primary":
        return <Shield className="w-4 h-4 text-emerald-500" />
      case "secondary":
        return <CreditCard className="w-4 h-4 text-blue-400" />
      case "exchange":
        return <Landmark className="w-4 h-4 text-amber-500" />
      case "hardware":
        return <HardDrive className="w-4 h-4 text-purple-400" />
      default:
        return <Wallet className="w-4 h-4 text-zinc-400" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div
      className={cn(
        "w-full min-h-full h-full mx-auto flex flex-col",
        "bg-[#101010]",
        "rounded-none shadow-md",
        className,
      )}
    >
      <div className="p-5 border-b border-[#1F1F23]">
        <p className="text-sm font-medium text-zinc-300">Wallets</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0.5 ">
          {wallets.map((wallet, index) => (
            <div
              key={wallet.id}
              className={cn(
                "group flex items-center justify-between",
                "p-3",
                "hover:bg-[#151518]",
                "transition-all duration-200",
                index !== wallets.length - 1 && "border-b border-[#1F1F23]/40",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                  {getWalletIcon(wallet.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">{wallet.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-zinc-500 font-mono">{wallet.address}</p>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3 text-zinc-500 hover:text-zinc-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#1F1F23] mt-auto">
        <div className="grid grid-cols-2 gap-0">
          <Button
            variant="ghost"
            className="flex border-[#1F1F23] border-none rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Wallet</span>
          </Button>
          <Button
            variant="ghost"
            className="flex border-[#1F1F23] rounded-none border-l border-y-0 border-r-0 items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Wallet className="w-4 h-4" />
            <span>Import Wallet</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

