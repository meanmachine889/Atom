"use client"

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Settings,
  HelpCircle,
  Menu,
  Home,
  Atom,
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-4 py-3 text-sm rounded-md transition-all duration-200 text-zinc-300 hover:text-white hover:bg-[#151518]"
      >
        <Icon className="h-5 w-5 mr-3 text-zinc-400 group-hover:text-white" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-[#101010] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6 text-zinc-300" />
      </button>

      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 bg-[#101010] transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:w-64 border-r border-[#1F1F23]
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          <Link href="#" className="h-16 px-3 flex items-center border-b border-[#1F1F23]">
            <Atom className="h-5 w-5 font-light text-white" />
            <span className="text-lg font-normal text-white ml-3">Atom</span>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase text-zinc-500">Overview</div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Home}>Dashboard</NavItem>
                  <NavItem href="#" icon={BarChart2}>Analytics</NavItem>
                  <NavItem href="#" icon={Building2}>Organization</NavItem>
                  <NavItem href="#" icon={Folder}>Projects</NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase text-zinc-500">Finance</div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Wallet}>Transactions</NavItem>
                  <NavItem href="#" icon={Receipt}>Invoices</NavItem>
                  <NavItem href="#" icon={CreditCard}>Payments</NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 py-4">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>Settings</NavItem>
              <NavItem href="#" icon={HelpCircle}>Help</NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
