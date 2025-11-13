"use client";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, PlusCircle, Layers } from "lucide-react";

export default function DietPlanTemplatesLayout({ children }) {
  const router = useRouter();
  const { selectedGymID } = useParams();

  const handleNewPlan = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/new`);

  const handleTemplates = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/templates`);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">
          Diet Plan Templates
        </h1>

        {/* 🔽 Dropdown Navigation */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              Navigate <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleNewPlan}
              className="cursor-pointer text-gray-700 hover:bg-orange-50"
            >
              <PlusCircle className="w-4 h-4 mr-2 text-orange-600" />
              Create New Diet Plan
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleTemplates}
              className="cursor-pointer text-gray-700 hover:bg-orange-50"
            >
              <Layers className="w-4 h-4 mr-2 text-indigo-600" />
              View Saved Templates
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Page Body */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
