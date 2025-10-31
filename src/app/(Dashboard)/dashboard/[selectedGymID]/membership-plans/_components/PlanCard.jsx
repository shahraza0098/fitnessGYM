"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlanCard({ plan, onEdit, onDeactivate, onActivate }) {
  const isActive = plan?.isActive ?? true;

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 border rounded-2xl">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <Badge variant={isActive ? "default" : "secondary"}className={`bg-[#1C8051]`}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mb-1">
            {plan.durationMonths === 1
              ? "Monthly"
              : plan.durationMonths === 3
              ? "Quarterly"
              : plan.durationMonths === 12
              ? "Annually"
              : `${plan.durationMonths} Months`}
          </p>

          <p className="text-2xl font-bold text-purple-700 mb-3">
            ₹{Number(plan.price)}
          </p>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
            {plan.benefits?.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <Button variant="outline" onClick={() => onEdit(plan)}>
            Edit Plan
          </Button>
          <Button variant="outline">Manage Discounts</Button>
          {isActive ? (
            <Button
              variant="destructive"
              onClick={() => onDeactivate(plan.id)}
            >
              Deactivate Plan
            </Button>
          ) : (
            <Button variant="default" onClick={() => onActivate(plan.id)}>
              Activate Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
