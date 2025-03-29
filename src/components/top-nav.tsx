"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/" },
];

export default function TopNav() {

  return (
    <nav className="px-3 flex items-center justify-between bg-white dark:bg-[#101010] border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden text-gray-900 dark:text-zinc-50 sm:flex items-center truncate max-w-[300px]">
        {breadcrumbItems.map((item, index) => (
          <span key={index} className="flex items-center">
        <Link href={item.href || "#"} className="hover:underline">
          {item.label}
        </Link>
        {index < breadcrumbItems.length - 1 && (
          <ChevronRight className="mx-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

