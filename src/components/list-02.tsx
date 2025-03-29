import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  icon: LucideIcon;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

interface List02Props {
  transactions?: Transaction[];
  className?: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Bitcoin Purchase",
    amount: "₿0.05",
    type: "outgoing",
    category: "investment",
    icon: Wallet,
    timestamp: "Today, 4:30 PM",
    status: "completed",
  },
  {
    id: "2",
    title: "Ethereum Staking Reward",
    amount: "Ξ0.25",
    type: "incoming",
    category: "staking",
    icon: Wallet,
    timestamp: "Today, 10:15 AM",
    status: "completed",
  },
  {
    id: "3",
    title: "USDT Withdrawal",
    amount: "$500.00",
    type: "outgoing",
    category: "transfer",
    icon: CreditCard,
    timestamp: "Yesterday",
    status: "pending",
  },
  {
    id: "4",
    title: "Solana Airdrop",
    amount: "◎2.5",
    type: "incoming",
    category: "airdrop",
    icon: Wallet,
    timestamp: "Yesterday, 6:00 PM",
    status: "completed",
  },
  {
    id: "5",
    title: "BNB Swap to USDC",
    amount: "₿0.02",
    type: "outgoing",
    category: "swap",
    icon: ShoppingCart,
    timestamp: "Today, 1:00 PM",
    status: "completed",
  },
  {
    id: "6",
    title: "DOGE Tip Received",
    amount: "Ð250",
    type: "incoming",
    category: "tip",
    icon: Wallet,
    timestamp: "Today, 5:30 AM",
    status: "completed",
  },
];

export default function List02({ transactions = TRANSACTIONS, className }: List02Props) {
  return (
    <div className={cn("w-full mx-auto flex flex-col", "bg-[#101010]", "rounded-none shadow-md", className)}>
      <div className="p-5 border-b border-[#1F1F23]">
        <p className="text-sm font-medium text-zinc-300">Recent Transactions</p>
      </div>

      <div className="">
        <div className="space-y-0.5">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "group flex items-center justify-between",
                "p-3",
                "hover:bg-[#151518]",
                "transition-all duration-200",
                "border-b border-[#1F1F23]/40",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                  <transaction.icon className="w-5 h-5 text-zinc-100" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">{transaction.title}</h3>
                  <p className="text-xs text-zinc-500">{transaction.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    transaction.type === "incoming" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {transaction.type === "incoming" ? "+" : "-"}
                  {transaction.amount}
                </span>
                {transaction.type === "incoming" ? (
                  <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
