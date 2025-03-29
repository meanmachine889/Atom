import { cn } from "@/lib/utils"
import { Wallet, TrendingUp, TrendingDown, Bitcoin, Coins, DollarSign, Rocket, Dog } from "lucide-react"

interface CryptoPrice {
  id: string
  name: string
  symbol: string
  price: string
  change: string
  type: "bitcoin" | "ethereum" | "solana" | "dogecoin" | "bnb"
}

interface CryptoListProps {
  prices?: CryptoPrice[]
  className?: string
}

const CRYPTO_PRICES: CryptoPrice[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: "$65,230.45",
    change: "+3.2%",
    type: "bitcoin",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,150.20",
    change: "-1.5%",
    type: "ethereum",
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    price: "$145.30",
    change: "+2.1%",
    type: "solana",
  },
  {
    id: "4",
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.085",
    change: "-0.8%",
    type: "dogecoin",
  },
  {
    id: "5",
    name: "BNB",
    symbol: "BNB",
    price: "$410.00",
    change: "+0.5%",
    type: "bnb",
  },
]

export default function CryptoList({ prices = CRYPTO_PRICES, className }: CryptoListProps) {
  // Function to get the appropriate icon based on crypto type
  const getCryptoIcon = (type: string) => {
    switch (type) {
      case "bitcoin":
        return <Bitcoin className="w-4 h-4 text-amber-500" />
      case "ethereum":
        return <Coins className="w-4 h-4 text-indigo-400" />
      case "solana":
        return <Rocket className="w-4 h-4 text-purple-400" />
      case "dogecoin":
        return <Dog className="w-4 h-4 text-yellow-500" />
      case "bnb":
        return <DollarSign className="w-4 h-4 text-yellow-400" />
      default:
        return <Wallet className="w-4 h-4 text-zinc-400" />
    }
  }

  return (
    <div className={cn("w-full mx-auto", "bg-[#101010]", "shadow-md", className)}>
      <div className="p-5 border-b border-[#1F1F23]">
        <p className="text-sm font-medium text-zinc-300">Market Trends</p>
      </div>

      <div className="space-y-0.5 p-2">
        {prices.map((crypto, index) => (
          <div
            key={crypto.id}
            className={cn(
              "group flex items-center gap-3",
              "p-3",
              "hover:bg-[#151518]",
              "transition-all duration-200",
              index !== prices.length - 1 && "border-b border-[#1F1F23]/40",
            )}
          >
            <div className={cn("p-2 rounded", "bg-[#18181C]", "flex items-center justify-center")}>
              {getCryptoIcon(crypto.type)}
            </div>

            <div className="flex-1 flex items-center justify-between min-w-0">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium text-zinc-100">{crypto.name}</h3>
                <p className="text-xs text-zinc-500">{crypto.symbol}</p>
              </div>

              <div className="flex flex-col items-end gap-0.5 pl-3">
                <span className="text-sm font-medium text-zinc-100">{crypto.price}</span>
                <div className="flex items-center gap-1">
                  {crypto.change.startsWith("+") ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      crypto.change.startsWith("+") ? "text-emerald-500" : "text-red-500",
                    )}
                  >
                    {crypto.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

