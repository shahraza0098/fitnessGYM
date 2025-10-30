// "use client";
// import { Card, CardContent } from "@/components/ui/card";
// import { User } from "lucide-react";

// export default function StaffList({ staff }) {
  
//   if (!staff?.length) return <p className="text-gray-500 mt-4">No staff found.</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//       {staff.map((s) => (
//         <Card key={s.id}>
//           <CardContent className="flex items-center gap-4 p-4">
//             <User className="text-blue-500" />
//             <div>
//               <p className="font-semibold">{s.name}</p>
//               <p className="text-sm text-gray-600">{s.email || "No email"}</p>
//               <p className="text-xs text-gray-500 capitalize">{s.role.toLowerCase()}</p>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }


"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StaffList({ staff }) {
  if (!staff?.length)
    return <p className="text-gray-500 mt-4">No staff found.</p>;

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {staff.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="flex items-center gap-2">
                <User className="text-blue-500 w-4 h-4" />
                {s.name}
              </TableCell>
              <TableCell>{s.email || "—"}</TableCell>
              <TableCell>{s.phone || "—"}</TableCell>
              <TableCell className="capitalize">{s.role}</TableCell>
              <TableCell>
                <button className="text-blue-600 hover:underline text-sm">
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
