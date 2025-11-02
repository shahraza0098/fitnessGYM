
// "use client";
// import { useEffect, useState, use } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, Bell, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function NotificationsPage({ params }) {
//   const { selectedGymID } = use(params);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchNotifications() {
//     try {
//       const res = await fetch(`/api/dashboard/${selectedGymID}/notifications`);
//       const data = await res.json();
//       setNotifications(data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function markAsRead(id) {
//     await fetch(`/api/dashboard/${selectedGymID}/notifications/${id}/mark-read`, {
//       method: "PATCH",
//     });
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
//     );
//   }

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-64 text-gray-600">
//         <Loader2 className="w-5 h-5 animate-spin mr-2" />
//         <span>Loading notifications...</span>
//       </div>
//     );

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Stay up to date with recent activity and system alerts.
//           </p>
//         </div>
//       </div>

//       {/* Empty state */}
//       {notifications.length === 0 ? (
//         <Card className="p-10 text-center shadow-sm">
//           <Bell className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />
//           <p className="text-gray-500">No notifications found.</p>
//         </Card>
//       ) : (
//         <div className="space-y-3">
//           {notifications.map((n) => (
//             <Card
//               key={n.id}
//               className={`transition-all duration-200 hover:shadow-sm ${
//                 n.read
//                   ? "bg-muted/40 border-muted"
//                   : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40"
//               }`}
//             >
//               <CardContent className="p-4 flex justify-between items-start">
//                 {/* Left: Message + Date */}
//                 <div className="space-y-1">
//                   <p
//                     className={`font-medium leading-snug ${
//                       n.read ? "text-gray-600" : "text-gray-900 dark:text-gray-100"
//                     }`}
//                   >
//                     {n.message}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {new Date(n.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 {/* Right: Badge + Button */}
//                 <div className="flex items-center gap-3">
//                   <Badge
//                     variant={
//                       n.type.includes("EXPIRY")
//                         ? "outline"
//                         : n.type === "PLAN_EXPIRED"
//                         ? "destructive"
//                         : "secondary"
//                     }
//                     className="uppercase tracking-wide text-xs"
//                   >
//                     {n.type.replaceAll("_", " ")}
//                   </Badge>

//                   {!n.read && (
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
//                       onClick={() => markAsRead(n.id)}
//                     >
//                       <CheckCircle2 className="w-4 h-4 mr-1" />
//                       Mark as Read
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Loader2, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationsPage({ params }) {
  const { selectedGymID } = use(params);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotifications() {
    try {
      const res = await fetch(`/api/dashboard/${selectedGymID}/notifications`);
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id) {
    try {
      await fetch(`/api/dashboard/${selectedGymID}/notifications/${id}/mark-read`, {
        method: "PATCH",
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-[#5e548e]">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Loading notifications...</span>
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-[#f9f6ff]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-[#231942] w-6 h-6" />
          <h1 className="text-2xl font-bold text-[#231942]">
            Notifications
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Stay up to date with alerts and updates.
        </p>
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <Card className="p-10 text-center shadow-md border-[#e0b1cb]/50">
          <Bell className="mx-auto mb-3 w-10 h-10 text-[#9f86c0]" />
          <p className="text-[#5e548e] font-medium">No notifications found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const isExpiry = n.type.includes("EXPIRY");
            const isExpired = n.type === "PLAN_EXPIRED";
            const colorClass = isExpired
              ? "border-red-300 bg-red-50"
              : isExpiry
              ? "border-yellow-200 bg-yellow-50"
              : "border-[#e0b1cb]/40 bg-white";

            const Icon = isExpired
              ? AlertTriangle
              : isExpiry
              ? Info
              : Bell;

            return (
              <motion.div
                key={n.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <Card
                  className={`transition-all duration-300 border ${colorClass} shadow-sm hover:shadow-md rounded-2xl`}
                >
                  <CardContent className="p-5 flex justify-between items-start gap-4">
                    {/* Left: Icon + Message */}
                    <div className="flex gap-3">
                      <div className="p-2 rounded-full bg-[#be95c4]/20">
                        <Icon className="w-5 h-5 text-[#5e548e]" />
                      </div>
                      <div>
                        <p
                          className={`font-medium leading-snug ${
                            n.read ? "text-gray-600" : "text-[#231942]"
                          }`}
                        >
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Right: Badge + Action */}
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`uppercase tracking-wide text-xs border-[#9f86c0] text-[#5e548e]`}
                      >
                        {n.type.replaceAll("_", " ")}
                      </Badge>

                      {!n.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#5e548e] hover:bg-[#e0b1cb]/20 hover:text-[#231942] transition"
                          onClick={() => markAsRead(n.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

