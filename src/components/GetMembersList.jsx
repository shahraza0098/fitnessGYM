// import React, {useState} from 'react'
// import { Input } from "@/components/ui/input"
// import axios from 'axios';
// function GetMembersList({gymId}) {

//      const [members, setMembers] = useState([]);

//      const handleChange = async (e) => {
//         console.log(e.target.value);
//         const res= await axios.get(`/api/dashboard/${gymId}/get-member/?memberName=${e.target.value}`);
//         console.log(res.data);
//         setMembers(res.data.member);


//     }

//     console.log("members:", members);
//   return (
//     <div>
//       <Input type="text" placeholder="enter name of member" onChange={handleChange} />
//         <ul>
//             {members.map((member) => (
//                 <li key={member.id}>
//                     {member.name}
//                 </li>
//             ))}
//         </ul>
//     </div>
//   )
// }

// export default GetMembersList



"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function GetMembersList({ gymId, selectedTemplate }) {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState("");

  console.log("getting members list in frontend:", members)
  // 🔍 Debounced Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) {
        setMembers([]);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/dashboard/${gymId}/get-member?memberName=${query}`
        );
        setMembers(res.data.member || []);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, gymId]);

  // 🧠 Assign Template to Member
  const handleAssign = async () => {
    if (!selectedMember || !selectedTemplate) {
      setMessage("⚠️ Please select both a member and a template.");
      return;
    }

    try {
      setAssigning(true);
      setMessage("");

      const res = await fetch(`/api/ai/diet/save?memberId=${selectedMember?.id}&memberName=${selectedMember.name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedTemplate.plan, // JSON plan from template
          memberId: selectedMember.id,
          trainerId: selectedTemplate.trainerId,
          goal: selectedTemplate.goal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Diet plan successfully assigned!");
        setSelectedMember(null);
        setQuery("");
        setMembers([]);
      } else {
        setMessage("❌ Failed to assign diet plan.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error assigning template.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6 max-w-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Assign Diet Plan to Member
      </h3>

      <Input
        type="text"
        placeholder="Search member by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3"
      />

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {/* Member list dropdown */}
      {members.length > 0 && (
        <ul className="border rounded-md max-h-48 overflow-y-auto mb-3">
          {members.map((member) => (
            <li
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`p-2 cursor-pointer hover:bg-orange-50 ${
                selectedMember?.id === member.id
                  ? "bg-orange-100 font-medium"
                  : ""
              }`}
            >
              {member.name}{" "}
              <span className="text-gray-500 text-sm">({member.email})</span>
            </li>
          ))}
        </ul>
      )}

      {/* Selected Member Info */}
      {selectedMember && (
        <div className="mb-3 text-sm text-gray-700">
          Selected:{" "}
          <span className="font-semibold text-orange-700">
            {selectedMember.name}
          </span>
        </div>
      )}

      <Button
        disabled={!selectedMember || assigning}
        onClick={handleAssign}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
      >
        {assigning ? "Assigning..." : "Send Diet Plan"}
      </Button>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
