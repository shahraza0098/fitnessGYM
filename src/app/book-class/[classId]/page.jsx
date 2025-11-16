// app/book-class/[classId]/page.js
"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useState } from "react";

export default function BookClassPage() {
  const { classId } = useParams();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");
  const [status, setStatus] = useState("idle");

  const handleBooking = async () => {
    setStatus("loading");
    const res = await fetch("/api/classes/book", {
      method: "POST",
      body: JSON.stringify({ classId, memberId }),
    });
    const data = await res.json();
    setStatus(data.success ? "success" : "error");
  };

  if (status === "success") return <p>✅ Booking Confirmed!</p>;
  if (status === "error") return <p>❌ Booking Failed.</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Booking</h1>
      <button
        onClick={handleBooking}
        disabled={status === "loading"}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        {status === "loading" ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
