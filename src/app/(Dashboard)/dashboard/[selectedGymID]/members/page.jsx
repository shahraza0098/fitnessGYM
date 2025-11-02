// "use client";
// import React, {  useState, use } from "react";
// import { useParams } from "next/navigation";
// import AddMemberDialog from "./_components/AddMemberDialog";
// import MembersTable from "./_components/MembersTable";
// import { cn } from "@/lib/utils";

// export default function MembersPage({params}) {
//    const { selectedGymID } = use(params);
//   const [refresh, setRefresh] = useState(0);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-semibold">Member Management</h1>
//         <AddMemberDialog gymId={selectedGymID} onMemberAdded={() => setRefresh(prev => prev + 1)} />
//       </div>

//       {/* Members Table */}
//       {/* <MembersTable key={refresh} gymId={selectedGymID} /> */}


//       <div
//               className={cn(
//                 "rounded-lg border bg-card shadow-sm p-4 transition-all duration-200"
//               )}
//             >
//                 <MembersTable key={refresh} gymId={selectedGymID} />
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState, use } from "react";
import MemberOverview from "./_components/MemberOverview";
import AddMemberDialog from "./_components/AddMemberDialog";
import MembersTable from "./_components/MembersTable";
import MemberJoinChart from "./_components/MemberJoinChart";
import { cn } from "@/lib/utils";

export default function MembersPage({ params }) {
  const { selectedGymID } = use(params);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Member Management</h1>
        <AddMemberDialog
          gymId={selectedGymID}
          onMemberAdded={() => setRefresh((prev) => prev + 1)}
        />
      </div>

     {/* Overview Section */}
      <MemberOverview gymId={selectedGymID} />

      {/* Members Table */}
      <div
        className={cn(
          "rounded-lg border bg-card shadow-sm p-4 transition-all duration-200"
        )}
      >
        <MembersTable key={refresh} gymId={selectedGymID} />
      </div>
       {/* Member Join Chart */}
      <MemberJoinChart gymId={selectedGymID} />
    </div>
  );
}

