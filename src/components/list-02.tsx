"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  X,
  ExternalLink,
  Copy,
  Check,
  Info,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  icon: LucideIcon;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  hash?: string;
  from?: string;
  to?: string;
}

interface TransactionListProps {
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
    hash: "0x3a4e5f6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
    from: "0x1234...5678",
    to: "0x8765...4321",
  },
  {
    id: "2",
    title: "Ethereum Staking",
    amount: "Ξ0.25",
    type: "incoming",
    category: "staking",
    icon: Wallet,
    timestamp: "Today, 10:15 AM",
    status: "completed",
    hash: "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
    from: "0x9876...5432",
    to: "0x1234...5678",
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
    hash: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    from: "0x1234...5678",
    to: "0x5432...9876",
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
    hash: "0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    from: "0x8765...4321",
    to: "0x1234...5678",
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
    hash: "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    from: "0x1234...5678",
    to: "0x4321...8765",
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
    hash: "0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    from: "0x6543...2109",
    to: "0x1234...5678",
  },
];

export default function TransactionList({ transactions = TRANSACTIONS, className }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCancelTransaction = () => {
    setShowSuccessToast(true);
    setDetailsOpen(false);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterStatus && transaction.status !== filterStatus) return false;
    if (filterType && transaction.type !== filterType) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500/20 md:block hidden text-emerald-400 text-xs">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/20 md:block hidden text-amber-400 text-xs">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 md:block hidden text-red-400 text-xs">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full mx-auto flex flex-col", "bg-[#101010]", "rounded-none shadow-md", className)}>
      <div className="p-5 border-b border-[#1F1F23] flex justify-between items-center w-full gap-2">
        <p className="text-sm font-medium text-zinc-300">Recent Transactions</p>
        <div className="flex justify-start gap-2 flex-1 w-full md:w-fit">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFilterType(filterType === "incoming" ? null : "incoming")}
            className={cn(
              "text-xs py-1 px-2 h-auto",
              filterType === "incoming" ? "bg-[#18181C] text-emerald-400" : "text-zinc-400"
            )}
          >
            <ArrowDownLeft className="w-3 h-3 mr-1" />
            In
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFilterType(filterType === "outgoing" ? null : "outgoing")}
            className={cn(
              "text-xs py-1 px-2 h-auto",
              filterType === "outgoing" ? "bg-[#18181C] text-red-400" : "text-zinc-400"
            )}
          >
            <ArrowUpRight className="w-3 h-3 mr-1" />
            Out
          </Button>
        </div>
      </div>

      <div className="">
        <div className="space-y-0.5">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "group flex items-center justify-between",
                  "p-3",
                  "hover:bg-[#151518] cursor-pointer",
                  "transition-all duration-200",
                  "border-b border-[#1F1F23]/40",
                )}
                onClick={() => handleTransactionClick(transaction)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                    <transaction.icon className="w-5 h-5 text-zinc-100" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-zinc-100">{transaction.title}</h3>
                      {getStatusBadge(transaction.status)}
                    </div>
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
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-zinc-500 text-sm">No transactions match your filters</p>
              <Button 
                variant="ghost" 
                className="mt-2 text-zinc-400 hover:text-zinc-100"
                onClick={() => { setFilterStatus(null); setFilterType(null); }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-3">
              {selectedTransaction && (
                <>
                  <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                    {selectedTransaction.icon && <selectedTransaction.icon className="w-5 h-5 text-zinc-100" />}
                  </div>
                  <div className="flex flex-col">
                    {selectedTransaction.title}
                    <div className="flex items-center mt-1">
                      {getStatusBadge(selectedTransaction.status)}
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Amount</span>
                <span
                  className={cn(
                    "text-zinc-100 font-medium",
                    selectedTransaction.type === "incoming" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {selectedTransaction.type === "incoming" ? "+" : "-"}
                  {selectedTransaction.amount}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Time</span>
                <span className="text-zinc-100 font-medium">{selectedTransaction.timestamp}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Category</span>
                <span className="text-zinc-100 font-medium capitalize">{selectedTransaction.category}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">From</span>
                <div className="flex items-center gap-1">
                  <span className="text-zinc-100 font-medium">{selectedTransaction.from}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(selectedTransaction.from || "", "from");
                    }}
                  >
                    {copied === "from" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">To</span>
                <div className="flex items-center gap-1">
                  <span className="text-zinc-100 font-medium">{selectedTransaction.to}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(selectedTransaction.to || "", "to");
                    }}
                  >
                    {copied === "to" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Hash</span>
                <div className="flex items-center gap-1">
                  <span className="text-zinc-100 font-mono text-xs">{selectedTransaction.hash?.substring(0, 10)}...</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(selectedTransaction.hash || "", "hash");
                    }}
                  >
                    {copied === "hash" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setDetailsOpen(false)}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100 border-[#1F1F23]"
            >
              Close
            </Button>
            {selectedTransaction?.status === "pending" && (
              <Button
                onClick={handleCancelTransaction}
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button
              onClick={() => window.open(`https://etherscan.io/tx/${selectedTransaction?.hash}`, '_blank')}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-[#18181C] border border-[#1F1F23] text-zinc-100 p-4 rounded shadow-lg animate-in fade-in slide-in-from-bottom-5 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-400" />
          <span>Transaction cancelled successfully</span>
        </div>
      )}
    </div>
  );
}