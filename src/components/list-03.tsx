import { cn } from "@/lib/utils"
import {
  Bitcoin,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import React from "react"

interface CryptoItem {
  id: string
  name: string
  symbol: string
  icon: React.ElementType
  iconStyle: string
  price: string
  change: number
  allocation: string
  status: "bullish" | "bearish" | "neutral"
}

interface CryptoListProps {
  items?: CryptoItem[]
  className?: string
}

const iconStyles = {
  bullish: "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100",
  bearish: "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100",
  neutral: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
}

const statusConfig = {
  bullish: {
    icon: TrendingUp,
    class: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  bearish: {
    icon: TrendingDown,
    class: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  neutral: {
    icon: AlertCircle,
    class: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-900/30",
  },
}

const CRYPTO_ITEMS: CryptoItem[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    iconStyle: "bullish",
    price: "$46,000",
    change: 5.2,
    allocation: "40% of Portfolio",
    status: "bullish",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    icon: Bitcoin,
    iconStyle: "neutral",
    price: "$3,200",
    change: 0.8,
    allocation: "35% of Portfolio",
    status: "neutral",
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    icon: Bitcoin,
    iconStyle: "bearish",
    price: "$150",
    change: -3.5,
    allocation: "15% of Portfolio",
    status: "bearish",
  },
]

export default function CryptoList({ items = CRYPTO_ITEMS, className }: CryptoListProps) {
  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="flex gap-0 min-w-full">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col",
              "min-w-[280px] flex-1 shrink-0",
              "bg-[#101010]",
              "border-r border-zinc-800",
              "hover:border-zinc-700",
              "transition-all duration-200",
              "shadow-sm backdrop-blur-xl",
            )}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", iconStyles[item.iconStyle as keyof typeof iconStyles])}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].class,
                  )}
                >
                  {React.createElement(statusConfig[item.status].icon, { className: "w-3.5 h-3.5" })}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{item.name} ({item.symbol})</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.allocation}</p>
              </div>

              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-zinc-900 dark:text-zinc-100">{item.price}</span>
                <span
                  className={cn(
                    item.change >= 0 ? "text-green-500" : "text-red-500",
                    "text-xs font-medium"
                  )}
                >
                  {item.change >= 0 ? `+${item.change}%` : `${item.change}%`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}