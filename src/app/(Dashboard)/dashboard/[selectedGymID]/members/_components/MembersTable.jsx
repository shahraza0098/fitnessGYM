"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function MembersTable({ gymId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch members from your API
  async function fetchMembers() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/${gymId}/add-member?gymId=${gymId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setMembers(data || []);
    } catch (err) {
      console.error("❌ Error fetching members:", err);
      setError("Failed to load members. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gymId) fetchMembers();
  }, [gymId]);

  if (loading) {
    return (
      <div className="border rounded-lg p-6 flex items-center justify-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded-lg p-4 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-card transition-all duration-200 hover:shadow-md">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-neutral-900/50">
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-gray-50 dark:hover:bg-neutral-900/40 transition"
              >
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email || "-"}</TableCell>
                <TableCell>{member.phone || "-"}</TableCell>
                <TableCell className="capitalize">
                  {member.gender?.toLowerCase() || "-"}
                </TableCell>

                {/* ✅ Membership Plan Badge (fixed property name) */}
                <TableCell>
                  {member.membershipPlan?.name ? (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    >
                      {member.membershipPlan.name}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-gray-400 border-gray-300 dark:border-gray-700"
                    >
                      No Plan
                    </Badge>
                  )}
                </TableCell>

                {/* ✅ Status Badge */}
                <TableCell>
                  <Badge
                    className={
                      member.status?.toLowerCase() === "inactive"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }
                  >
                    {member.status || "Active"}
                  </Badge>
                </TableCell>

                {/* ✅ Join Date */}
                <TableCell>
                  {member.joinDate
                    ? new Date(member.joinDate).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-sm text-gray-500 italic"
              >
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
