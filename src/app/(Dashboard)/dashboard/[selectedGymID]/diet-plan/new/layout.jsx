"use client";
import { DietPlanProvider } from "../context/DietPlanContext";
import StepNavigation from "../_components/StepNavigation";
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
import { ChevronDown } from "lucide-react";

export default function DietPlanLayout({ children }) {
  const router = useRouter();
  const { selectedGymID } = useParams();

  const handleNewPlan = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/new`);

  const handleTemplates = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/templates`);

  return (
    <DietPlanProvider>
      <div className="flex flex-col h-full w-full bg-gray-50">
        {/* Header Section */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Diet Plans</h1>

          {/* 🔽 Dropdown Menu */}
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
                🧠 Create New Diet Plan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleTemplates}
                className="cursor-pointer text-gray-700 hover:bg-orange-50"
              >
                📋 View Saved Templates
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Page Body */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Step Navigation */}
        <StepNavigation />
      </div>
    </DietPlanProvider>
  );
}
