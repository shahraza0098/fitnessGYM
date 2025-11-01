
"use client";
import { useEffect, useState, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id) {
    await fetch(`/api/dashboard/${selectedGymID}/notifications/${id}/mark-read`, {
      method: "PATCH",
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Loading notifications...</span>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay up to date with recent activity and system alerts.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {notifications.length === 0 ? (
        <Card className="p-10 text-center shadow-sm">
          <Bell className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />
          <p className="text-gray-500">No notifications found.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`transition-all duration-200 hover:shadow-sm ${
                n.read
                  ? "bg-muted/40 border-muted"
                  : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40"
              }`}
            >
              <CardContent className="p-4 flex justify-between items-start">
                {/* Left: Message + Date */}
                <div className="space-y-1">
                  <p
                    className={`font-medium leading-snug ${
                      n.read ? "text-gray-600" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {n.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Right: Badge + Button */}
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      n.type.includes("EXPIRY")
                        ? "outline"
                        : n.type === "PLAN_EXPIRED"
                        ? "destructive"
                        : "secondary"
                    }
                    className="uppercase tracking-wide text-xs"
                  >
                    {n.type.replaceAll("_", " ")}
                  </Badge>

                  {!n.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      onClick={() => markAsRead(n.id)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
