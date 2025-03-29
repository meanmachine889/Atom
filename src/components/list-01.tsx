import { cn } from "@/lib/utils";
import { SendHorizontal, Plus, ArrowDownLeft, Bitcoin, Coins, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  type: "bitcoin" | "ethereum" | "litecoin" | "usd";
}

interface CryptoListProps {
  totalBalance?: string;
  cryptos?: CryptoItem[];
  className?: string;
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
];

export default function CryptoList({ cryptos = CRYPTOS, className }: CryptoListProps) {
  const getCryptoIcon = (type: string) => {
    switch (type) {
      case "bitcoin":
        return <Bitcoin className="w-5 h-5 text-amber-500" />;
      case "ethereum":
        return <Coins className="w-5 h-5 text-indigo-400" />;
      case "litecoin":
        return <Coins className="w-5 h-5 text-blue-400" />;
      case "usd":
        return <DollarSign className="w-5 h-5 text-green-500" />;
      default:
        return <Coins className="w-5 h-5 text-zinc-400" />;
    }
  };

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
                "hover:bg-[#151518]",
                "transition-all duration-200",
                index !== cryptos.length - 1 && "border-b border-[#1F1F23]/40"
              )}
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
            variant="ghost"
            className="flex border-[#1F1F23] border-0 border-r rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Buy</span>
          </Button>
          <Button
            variant="ghost"
            className="flex border-[#1F1F23] border-0 border-r rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <SendHorizontal className="w-4 h-4" />
            <span>Send</span>
          </Button>
          <Button
            variant="ghost"
            className="flex border-[#1F1F23] border-0 rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Receive</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
