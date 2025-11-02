"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Activity, AlertTriangle, Venus, Gauge } from "lucide-react";

export default function MemberOverview({ gymId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const res = await fetch(`/api/dashboard/${gymId}/member-overview`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching overview:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [gymId]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-center">Loading overview...</div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-gray-500 text-center">
        No data available.
      </div>
    );
  }

  const { totalMembers, newThisMonth, activePlans, expiredPlans, genderStats, avgAge } = stats;

  const items = [
    {
      label: "Total Members",
      value: totalMembers,
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "New This Month",
      value: newThisMonth,
      icon: <UserPlus className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Active Plans",
      value: activePlans,
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
    },
    {
      label: "Expired Plans",
      value: expiredPlans,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    },
    {
      label: "Gender Ratio",
      value: `${genderStats.male}/${genderStats.female}/${genderStats.other}`,
      icon: <Venus className="w-5 h-5 text-pink-500" />,
    },
    {
      label: "Average Age",
      value: avgAge ? `${avgAge} yrs` : "N/A",
      icon: <Gauge className="w-5 h-5 text-indigo-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="p-4 border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
        >
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
            {item.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
