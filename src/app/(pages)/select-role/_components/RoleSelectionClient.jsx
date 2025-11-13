// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { UserCog, Dumbbell, Users } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function RoleSelectionClient() {
//   const [role, setRole] = useState(null);
//   const [gymID, setGymID] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const res = await fetch("/api/user/metadata");
//         const data = await res.json();

//         if (data?.role) {
//           setRole(data.role);
//           console.log("Fetched role:", role);
//           if (data.role === "MANAGER" || data.role === "TRAINER") {
//             setGymID(data.selectedGymID);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user role:", error);
//       }
//     };

//     fetchUserRole();
//   }, []);

//   const roles = [
//     { label: "Owner", href: "/owner/select-gym", icon: UserCog },
//     {
//       label: "Manager",
//       href: gymID ? `/dashboard/${gymID}` : "#",
//       icon: Users,
//       disabled: !gymID,
//     },
//     {
//       label: "Trainer",
//       href: gymID ? `/dashboard/${gymID}` : "#",
//       icon: Dumbbell,
//       disabled: !gymID,
//     },
//   ];

//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-10">
//       <div>
//         <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
//           Please select your role to continue
//         </h1>
//         <p className="text-sm text-muted-foreground mt-2">
//           Choose the correct role to access your dashboard
//         </p>
//       </div>

//       <div className="flex items-center justify-center gap-10 flex-wrap">
//         {roles.map(({ label, href, icon: Icon, disabled }) => (
//           <Link key={label} href={disabled ? "#" : href}>
//             <Button
//               variant="outline"
//               size="icon"
//               disabled={disabled}
//               className={cn(
//                 "w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300",
//                 "border-2 text-gray-700 dark:text-gray-200 hover:scale-105",
//                 "hover:border-[#5e548e] hover:shadow-[0_0_15px_#9f86c0]",
//                 disabled &&
//                   "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
//               )}
//             >
//               <Icon className="w-6 h-6 mb-1" />
//               <span className="text-xs font-medium">{label}</span>
//             </Button>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCog, Dumbbell, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoleSelectionClient() {
  const [role, setRole] = useState(null);
  const [gymID, setGymID] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch("/api/user/metadata");
        const data = await res.json();

        if (data?.role) {
          setRole(data.role);
          if (data.role === "MANAGER" || data.role === "TRAINER") {
            setGymID(data.selectedGymID);
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const roles = [
    { label: "Owner", href: "/select-gym", icon: UserCog },
    {
      label: "Manager",
      href: gymID ? `/dashboard/${gymID}` : "#",
      icon: Users,
    },
    {
      label: "Trainer",
      href: gymID ? `/dashboard/${gymID}` : "#",
      icon: Dumbbell,
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          Please select your role to continue
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Choose the correct role to access your dashboard
        </p>
      </div>

      <div className="flex items-center justify-center gap-10 flex-wrap">
        {roles.map(({ label, href, icon: Icon }) => {
          const isUserRole = role?.toUpperCase() === label.toUpperCase();
          const isDisabled = !role || !isUserRole;

          return (
            <Link key={label} href={isDisabled ? "#" : href}>
              <Button
                variant="outline"
                size="icon"
                disabled={isDisabled}
                className={cn(
                  "w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300",
                  "border-2 text-gray-700 dark:text-gray-200 hover:scale-105",
                  "hover:border-[#5e548e] hover:shadow-[0_0_15px_#9f86c0]",
                  isDisabled &&
                    "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
                  isUserRole && "border-[#9f86c0] shadow-[0_0_10px_#9f86c0]"
                )}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
