"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Formnotify() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/test", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message || "Success"}`);
      } else {
        setMessage(`❌ ${data.message || "Failed"}`);
      }
    } catch (err) {
      setMessage("⚠️ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Sending..." : "Send Test Notification"}
      </Button>

      {message && (
        <p className="text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
}
