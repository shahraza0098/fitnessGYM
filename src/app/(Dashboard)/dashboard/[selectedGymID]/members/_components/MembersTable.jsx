// "use client";

// import { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



// export default function MembersTable({ gymId } ) {
//   const [members, setMembers] = useState([]);

//   async function fetchMembers() {
//     const res = await fetch(`/api/dashboard/${gymId}/add-member?gymId=${gymId}`);
//     const data = await res.json();
//     setMembers(data);
//   }

//   useEffect(() => {
//     fetchMembers();
//   }, [gymId]);

//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone</TableHead>
//             <TableHead>Gender</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Join Date</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {members.map(member => (
//             <TableRow key={member.id}>
//               <TableCell>{member.name}</TableCell>
//               <TableCell>{member.email || "-"}</TableCell>
//               <TableCell>{member.phone || "-"}</TableCell>
//               <TableCell>{member.gender || "-"}</TableCell>
//               <TableCell>{member.status}</TableCell>
//               <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


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

export default function MembersTable({ gymId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/${gymId}/add-member?gymId=${gymId}`);
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gymId) fetchMembers();
  }, [gymId]);

  if (loading) {
    return (
      <div className="border rounded-lg p-4 text-center text-sm text-gray-500">
        Loading members...
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email || "-"}</TableCell>
                <TableCell>{member.phone || "-"}</TableCell>
                <TableCell>{member.gender || "-"}</TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell>
                  {new Date(member.joinDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
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

