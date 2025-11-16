"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams,usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  ClipboardCheck,
  Settings,
  Hamburger,
  Users,
  BriefcaseBusiness ,
  ReceiptIndianRupee,
  BellRing,
  CalendarClock
} from "lucide-react";

export default function InvestorDashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer
  const pathname = usePathname();
  const params = useParams();
  const selectedGymID = params?.selectedGymID;

  // Lock body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // const menu = [
  //   { name: "Dashboard", href: "/investor-dashboard", icon: Home },
  //   { name: "Members", href: "/investor-dashboard/portfolio", icon: Users },
  //   { name: "Attendence", href: "/investor-dashboard/transaction", icon: ClipboardCheck },
  //   { name: "Diet Plan", href: "/investor-dashboard/investment-plan", icon: Hamburger },
  //   { name: "Settings", href: "/investor-dashboard/settings", icon: Settings },
  //   { name: "Staff Management", href: "/investor-dashboard/staff-management", icon: BriefcaseBusiness },
  // ];

    const menu = [
    { name: "Dashboard", href: `/dashboard/${selectedGymID}`, icon: Home },
    { name: "Members", href: `/dashboard/${selectedGymID}/members`, icon: Users },
    { name: "Attendance", href: `/dashboard/${selectedGymID}/attendance`, icon: ClipboardCheck },
    { name: "Diet Plan", href: `/dashboard/${selectedGymID}/diet-plan`, icon: Hamburger },
    { name: "Settings", href: `/dashboard/${selectedGymID}/settings`, icon: Settings },
    { name: "Staff Management", href: `/dashboard/${selectedGymID}/staff-management`, icon: BriefcaseBusiness },
    { name: "Membership Plans", href: `/dashboard/${selectedGymID}/membership-plans`, icon: ReceiptIndianRupee },
    { name: "Notifications", href: `/dashboard/${selectedGymID}/notifications`, icon: BellRing },
    { name: "Schedule Classes", href: `/dashboard/${selectedGymID}/classes`, icon: CalendarClock }
  ];

  // if (!selectedGymID) return <div>Loading gym...</div>;

  // IMPORTANT: explicitly include the tailwind classes you need here
  // so the JIT sees them. Do not try to build `lg:ml-${...}` dynamically.
  const mainMarginClass = isMobileOpen
    ? "lg:ml-0"             // when mobile drawer open, keep main full width even on lg
    : isCollapsed
    ? "lg:ml-20"            // collapsed sidebar width = w-20 -> ml-20
    : "lg:ml-64";           // expanded sidebar width = w-64 -> ml-64

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile topbar (shown on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 py-3">
        <button
          aria-label="Open menu"
          onClick={() => setIsMobileOpen((s) => !s)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <div className="text-lg font-semibold">Dashboard</div>
        <div style={{ width: 36 }} /> {/* spacer to center title */}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 bg-white border-r border-gray-200 text-gray-900 flex flex-col transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        role="navigation"
        aria-label="Investor sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
              <Home size={18} />
            </div>
            <span className={`${isCollapsed ? "hidden" : "text-lg font-semibold"}`}>
              GYM Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* collapse toggle (desktop only) */}
            <button
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setIsCollapsed((s) => !s)}
              className="hidden lg:inline-flex p-2 rounded hover:bg-gray-100"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* mobile close */}
            <button
              aria-label="Close menu"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-auto px-1 py-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-md transition-colors
                  ${active ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}`}
                onClick={() => setIsMobileOpen(false)}
                title={item.name}
              >
                <Icon className="w-5 h-5" />
                <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer (profile / quick actions) */}
        <div className="px-3 py-4 border-t border-gray-200">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 rounded-md bg-gray-200 flex items-center justify-center text-gray-700">
              <span className="text-sm font-semibold">ID</span>
            </div>

            <div className={`${isCollapsed ? "hidden" : "flex flex-col"}`}>
              <span className="text-sm font-medium">Gym Owner Name</span>
              <span className="text-xs text-gray-500">you@domain.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Main content */}
      <main className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${mainMarginClass}`}>
        {/* spacer for mobile topbar */}
        <div className="lg:hidden h-14" />
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}