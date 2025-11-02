
"use client";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ToggleButton, ToggleButtonGroup, MenuItem, Select } from "@mui/material";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function MemberJoinChart({ gymId }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("yearly"); // "yearly" or "monthly"
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const url =
        view === "yearly"
          ? `/api/dashboard/${gymId}/add-member/join-stats?year=${selectedYear}`
          : `/api/dashboard/${gymId}/add-member/join-stats?year=${selectedYear}&month=${selectedMonth}`;

      const res = await fetch(url);
      const result = await res.json();
      setData(result || []);
    } catch (err) {
      console.error("Error fetching join stats:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [gymId, view, selectedYear, selectedMonth]);

  const handleViewChange = (_, newView) => {
    if (newView) setView(newView);
  };

  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.count);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">📈 Member Join Timeline</h2>

        <div className="flex flex-wrap items-center gap-2">
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            onChange={handleViewChange}
          >
            <ToggleButton value="yearly">Yearly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
          </ToggleButtonGroup>

          {/* Year Selector */}
          <Select
            size="small"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>

          {/* Month Selector — only when in monthly view */}
          {view === "monthly" && (
            <Select
              size="small"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading chart...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No joining data available.
        </div>
      ) : (
        <LineChart
          xAxis={[
            {
              data: data.map((_, i) => i + 1),
              valueFormatter: (v) => labels[v - 1],
              label: view === "yearly" ? "Month" : "Day",
            },
          ]}
          series={[
            {
              data: values,
              label: "Members Joined",
              color: "#3b82f6",
            //   showMark: true,
            //   area: true,
            //   curve: "linear",
            },
          ]}
          height={300}
        />
      )}
    </Card>
  );
}
