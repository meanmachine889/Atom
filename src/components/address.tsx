"use client";

import { cn } from "@/lib/utils";
import {
  Wallet,
  Plus,
  Copy,
  Shield,
  Landmark,
  HardDrive,
  CreditCard,
  Check,
  Trash2,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface WalletItem {
  id: string;
  name: string;
  address: string;
  type: "primary" | "secondary" | "exchange" | "hardware";
  privateKey?: string;
}

interface WalletListProps {
  wallets?: WalletItem[];
  className?: string;
}

const WALLETS: WalletItem[] = [
  {
    id: "1",
    name: "Account 1",
    address: "0xAbc123...456Def",
    type: "primary",
    privateKey:
      "ae128bcd83f9a4e82931f63a89b92c4f89a3c54def12305e8f5c4a9b7d82e37f",
  },
  {
    id: "2",
    name: "Account 2",
    address: "0xDef456...789Ghi",
    type: "secondary",
    privateKey:
      "57d4f8a23b06a9c1e45f2d9b74c8901e2a3f45d67890b12c34d56e78f90a1b2c",
  },
  {
    id: "3",
    name: "Account 3",
    address: "0xGhi789...012Jkl",
    type: "exchange",
    privateKey:
      "6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7",
  },
  {
    id: "4",
    name: "Account 4",
    address: "0xJkl012...345Mno",
    type: "hardware",
    privateKey:
      "12d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3",
  },
];

export default function WalletList({
  wallets: initialWallets = WALLETS,
  className,
}: WalletListProps) {
  const [wallets, setWallets] = useState<WalletItem[]>(initialWallets);
  const [selectedWallet, setSelectedWallet] = useState<WalletItem | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [privateKeyVisible, setPrivateKeyVisible] = useState<boolean>(false);
  const [newWalletData, setNewWalletData] = useState({
    name: "",
    address: "",
    type: "secondary" as "primary" | "secondary" | "exchange" | "hardware",
    privateKey: "",
  });

  // Function to get the appropriate icon based on wallet type
  const getWalletIcon = (type: string) => {
    switch (type) {
      case "primary":
        return <Shield className="w-4 h-4 text-emerald-500" />;
      case "secondary":
        return <CreditCard className="w-4 h-4 text-blue-400" />;
      case "exchange":
        return <Landmark className="w-4 h-4 text-amber-500" />;
      case "hardware":
        return <HardDrive className="w-4 h-4 text-purple-400" />;
      default:
        return <Wallet className="w-4 h-4 text-zinc-400" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWalletClick = (wallet: WalletItem) => {
    setSelectedWallet(wallet);
    setModalType("details");
  };

  const handleAddWallet = () => {
    // Create a new wallet with a unique ID
    const newId = (
      Math.max(...wallets.map((w) => parseInt(w.id))) + 1
    ).toString();
    const newWallet: WalletItem = {
      ...newWalletData,
      id: newId,
    };

    setWallets([...wallets, newWallet]);
    setModalType(null);
    setNewWalletData({
      name: "",
      address: "",
      type: "secondary",
      privateKey: "",
    });
  };

  const handleDeleteWallet = (id: string) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
    setModalType(null);
  };

  const handleEditWallet = () => {
    if (!selectedWallet) return;

    setWallets(
      wallets.map((wallet) =>
        wallet.id === selectedWallet.id
          ? {
              ...wallet,
              name: newWalletData.name || wallet.name,
              type: newWalletData.type || wallet.type,
            }
          : wallet
      )
    );
    setModalType(null);
  };

  return (
    <div
      className={cn(
        "w-full min-h-full h-full mx-auto flex flex-col",
        "bg-[#101010]",
        "rounded-none shadow-md",
        className
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
                "hover:bg-[#151518] cursor-pointer",
                "transition-all duration-200",
                index !== wallets.length - 1 && "border-b border-[#1F1F23]/40"
              )}
              onClick={() => handleWalletClick(wallet)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                  {getWalletIcon(wallet.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">
                    {wallet.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-zinc-500 font-mono">
                      {wallet.address}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(wallet.address);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-zinc-500 hover:text-zinc-300" />
                      )}
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
            onClick={() => setModalType("add")}
            className="flex border-[#1F1F23] border-none rounded-none items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Wallet</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setModalType("import")}
            className="flex border-[#1F1F23] rounded-none border-l border-y-0 border-r-0 items-center justify-center gap-2 py-4 px-3 text-xs font-medium bg-[#101010] text-zinc-300 hover:bg-[#151518] hover:text-zinc-100 transition-all duration-200"
          >
            <Wallet className="w-4 h-4" />
            <span>Import Wallet</span>
          </Button>
        </div>
      </div>

      {/* Wallet Details Modal */}
      <Dialog
        open={modalType === "details"}
        onOpenChange={() => modalType === "details" && setModalType(null)}
      >
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-3">
              {selectedWallet && (
                <>
                  <div className="flex items-center justify-center w-8 h-8 bg-[#18181C] rounded">
                    {getWalletIcon(selectedWallet.type)}
                  </div>
                  {selectedWallet.name}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedWallet && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-100 font-mono text-xs">
                    {selectedWallet.address}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(selectedWallet.address)}
                    className="h-6 w-6 bg-[#18181C] border-[#1F1F23] text-zinc-100 hover:bg-[#232328]"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-[#1F1F23] pb-3">
                <span className="text-zinc-400">Type</span>
                <span className="text-zinc-100 font-medium capitalize">
                  {selectedWallet.type}
                </span>
              </div>
              {selectedWallet.privateKey && (
                <div className="space-y-2 border-b border-[#1F1F23] pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Private Key</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPrivateKeyVisible(!privateKeyVisible)}
                      className="h-6 w-6 bg-[#18181C] border-[#1F1F23] text-zinc-100 hover:bg-[#232328]"
                    >
                      {privateKeyVisible ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-[#18181C] p-3 rounded border border-[#1F1F23] overflow-x-auto">
                    <p className="text-zinc-100 font-mono text-xs break-all">
                      {privateKeyVisible
                        ? selectedWallet.privateKey
                        : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2">
            <Button
              onClick={() => {
                setNewWalletData({
                  name: selectedWallet?.name || "",
                  address: selectedWallet?.address || "",
                  type: selectedWallet?.type || "secondary",
                  privateKey: selectedWallet?.privateKey || "",
                });
                setModalType("edit");
              }}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteWallet(selectedWallet?.id || "")}
              className="flex-1 bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Wallet Modal */}
      <Dialog
        open={modalType === "add"}
        onOpenChange={() => modalType === "add" && setModalType(null)}
      >
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Add New Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-name">Wallet Name</Label>
              <Input
                id="wallet-name"
                value={newWalletData.name}
                onChange={(e) =>
                  setNewWalletData({ ...newWalletData, name: e.target.value })
                }
                placeholder="My Wallet"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Wallet Address</Label>
              <Input
                id="wallet-address"
                value={newWalletData.address}
                onChange={(e) =>
                  setNewWalletData({
                    ...newWalletData,
                    address: e.target.value,
                  })
                }
                placeholder="0x..."
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-type">Wallet Type</Label>
              <Select
                value={newWalletData.type}
                onValueChange={(value) =>
                  setNewWalletData({ ...newWalletData, type: value as "primary" | "secondary" | "exchange" | "hardware" })
                }
              >
                <SelectTrigger className="bg-[#18181C] border-[#1F1F23] text-zinc-100 w-full">
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-key">Private Key (Optional)</Label>
              <Input
                id="private-key"
                type="password"
                value={newWalletData.privateKey}
                onChange={(e) =>
                  setNewWalletData({
                    ...newWalletData,
                    privateKey: e.target.value,
                  })
                }
                placeholder="Enter private key"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100 w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddWallet}
              disabled={!newWalletData.name || !newWalletData.address}
              className="w-full bg-[#18181C] hover:bg-[#232328] text-zinc-100 py-2 sm:py-3"
            >
              Add Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Wallet Modal */}
      <Dialog
        open={modalType === "edit"}
        onOpenChange={() => modalType === "edit" && setModalType(null)}
      >
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-wallet-name">Wallet Name</Label>
              <Input
                id="edit-wallet-name"
                value={newWalletData.name}
                onChange={(e) =>
                  setNewWalletData({ ...newWalletData, name: e.target.value })
                }
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-wallet-type">Wallet Type</Label>
              <Select
                value={newWalletData.type}
                onValueChange={(
                  value: "primary" | "secondary" | "exchange" | "hardware"
                ) => setNewWalletData({ ...newWalletData, type: value })}
              >
                <SelectTrigger className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleEditWallet}
              disabled={!newWalletData.name}
              className="w-full bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalType === "import"}
        onOpenChange={() => modalType === "import" && setModalType(null)}
      >
        <DialogContent className="bg-[#101010] text-zinc-100 max-w-sm w-full p-6 border border-[#1F1F23] rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Import Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="import-wallet-name">Wallet Name</Label>
              <Input
                id="import-wallet-name"
                value={newWalletData.name}
                onChange={(e) =>
                  setNewWalletData({ ...newWalletData, name: e.target.value })
                }
                placeholder="Imported Wallet"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="import-private-key">Private Key</Label>
              <Input
                id="import-private-key"
                type="password"
                value={newWalletData.privateKey}
                onChange={(e) =>
                  setNewWalletData({
                    ...newWalletData,
                    privateKey: e.target.value,
                  })
                }
                placeholder="Enter private key to import"
                className="bg-[#18181C] border-[#1F1F23] text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="import-wallet-type">Wallet Type</Label>
              <Select
                value={newWalletData.type}
                onValueChange={(
                  value: "primary" | "secondary" | "exchange" | "hardware"
                ) => setNewWalletData({ ...newWalletData, type: value })}
              >
                <SelectTrigger className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181C] border-[#1F1F23] text-zinc-100">
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddWallet}
              disabled={!newWalletData.name || !newWalletData.privateKey}
              className="w-full bg-[#18181C] hover:bg-[#232328] text-zinc-100"
            >
              Import Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
