// // "use client";
// // import { useEffect, useState, use } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import axios from "axios";

// // export default function MembershipPlans({ params }) {
// //   const { selectedGymID } = use(params);
// //   const [plans, setPlans] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     durationMonths: 1,
// //     price: "",
// //     benefits: "",
// //     autoRenew: false,
// //   });

// //   const fetchPlans = async () => {
// //     const res= await axios.get(`/api/dashboard/${selectedGymID}/membership-plans`);
// //     const data = res.data;
// //     setPlans(data);
// //   };

// //   useEffect(() => { fetchPlans(); }, []);

// //   const handleCreate = async () => {
// //     await axios.post(`/api/dashboard/${selectedGymID}/membership-plans`, {
// //       ...form,
// //       benefits: form.benefits.split(",").map(b => b.trim()),
// //     });
// //     setForm({ name: "", durationMonths: 1, price: "", benefits: "", autoRenew: false });
// //     fetchPlans();
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       <h1 className="text-2xl font-semibold">Membership Plans</h1>

// //       <Card className="p-4 flex gap-4 items-center">
// //         <Input
// //           placeholder="Plan Name"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />
// //         <Input
// //           type="number"
// //           placeholder="Duration (months)"
// //           value={form.durationMonths}
// //           onChange={(e) => setForm({ ...form, durationMonths: e.target.value })}
// //         />
// //         <Input
// //           type="number"
// //           placeholder="Price"
// //           value={form.price}
// //           onChange={(e) => setForm({ ...form, price: e.target.value })}
// //         />
// //         <Input
// //           placeholder="Benefits (comma separated)"
// //           value={form.benefits}
// //           onChange={(e) => setForm({ ...form, benefits: e.target.value })}
// //         />
// //         <label className="flex items-center gap-2">
// //           <input
// //             type="checkbox"
// //             checked={form.autoRenew}
// //             onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
// //           />
// //           Auto Renew
// //         </label>
// //         <Button onClick={handleCreate}>Add Plan</Button>
// //       </Card>

// //       <div className="grid gap-4">
// //         {plans.map((plan) => (
// //           <Card key={plan.id}>
// //             <CardContent className="p-4">
// //               <h2 className="text-lg font-semibold">{plan.name}</h2>
// //               <p>{plan.durationMonths} months</p>
// //               <p>₹{plan.price}</p>
// //               <p>Benefits: {plan.benefits.join(", ")}</p>
// //               <p>Auto Renew: {plan.autoRenew ? "Yes" : "No"}</p>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



// "use client";
// import { useEffect, useState, use } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { Loader2 } from "lucide-react"; // for spinner icon

// export default function MembershipPlans({ params }) {
//   const { selectedGymID } = use(params);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     durationMonths: 1,
//     price: "",
//     benefits: "",
//     autoRenew: false,
//   });

//   const fetchPlans = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(`/api/dashboard/${selectedGymID}/membership-plans`);
//       setPlans(res.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching membership plans:", err);
//       setError("Failed to load membership plans. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const handleCreate = async () => {
//     try {
//       await axios.post(`/api/dashboard/${selectedGymID}/membership-plans`, {
//         ...form,
//         benefits: form.benefits
//           ? form.benefits.split(",").map((b) => b.trim())
//           : [],
//       });
//       setForm({
//         name: "",
//         durationMonths: 1,
//         price: "",
//         benefits: "",
//         autoRenew: false,
//       });
//       fetchPlans();
//     } catch (err) {
//       console.error("❌ Error creating plan:", err);
//       alert("Failed to create plan. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Membership Plans</h1>

//       {/* Plan creation form */}
//       <Card className="p-4 flex flex-wrap gap-4 items-center">
//         <Input
//           placeholder="Plan Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <Input
//           type="number"
//           placeholder="Duration (months)"
//           value={form.durationMonths}
//           onChange={(e) => setForm({ ...form, durationMonths: e.target.value })}
//         />
//         <Input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />
//         <Input
//           placeholder="Benefits (comma separated)"
//           value={form.benefits}
//           onChange={(e) => setForm({ ...form, benefits: e.target.value })}
//         />
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={form.autoRenew}
//             onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
//           />
//           Auto Renew
//         </label>
//         <Button onClick={handleCreate}>Add Plan</Button>
//       </Card>

//       {/* Plans list */}
//       {loading ? (
//         <div className="flex items-center gap-2 text-gray-600">
//           <Loader2 className="animate-spin w-5 h-5" />
//           Loading membership plans...
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : plans.length === 0 ? (
//         <Card className="p-6 text-center text-gray-500">
//           <p>No membership plans found.</p>
//           <p className="text-sm mt-2">Add your first plan using the form above 👆</p>
//         </Card>
//       ) : (
//         <div className="grid gap-4">
//           {plans?.map((plan) => (
//             <Card key={plan.id}>
//               <CardContent className="p-4">
//                 <h2 className="text-lg font-semibold">{plan.name}</h2>
//                 <p>{plan.durationMonths} months</p>
//                 <p>₹{Number(plan.price)}</p>
//                 <p>
//                   Benefits:{" "}
//                   {plan.benefits && plan.benefits.length > 0
//                     ? plan.benefits.join(", ")
//                     : "No benefits listed"}
//                 </p>
//                 <p>Auto Renew: {plan.autoRenew ? "Yes" : "No"}</p>
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
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PlanCard from "./_components/PlanCard";
import PlanForm from "./_components/PlanForm";

export default function MembershipPlans({ params }) {
  const { selectedGymID } = use(params);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    durationMonths: 1,
    price: "",
    benefits: "",
    autoRenew: false,
  });

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/dashboard/${selectedGymID}/membership-plans`);
      setPlans(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load membership plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(`/api/dashboard/${selectedGymID}/membership-plans`, {
        ...form,
        benefits: form.benefits.split(",").map((b) => b.trim()),
      });
      setForm({
        name: "",
        durationMonths: 1,
        price: "",
        benefits: "",
        autoRenew: false,
      });
      setFormVisible(false);
      fetchPlans();
    } catch (err) {
      console.error(err);
      alert("Failed to create plan");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Membership Plans Management</h1>
        <Button onClick={() => setFormVisible(!formVisible)}>
          <Plus className="w-4 h-4 mr-2" /> Create New Plan
        </Button>
      </div>

      {formVisible && <PlanForm form={form} setForm={setForm} onSubmit={handleCreate} />}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin w-5 h-5" /> Loading membership plans...
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : plans.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          <p>No membership plans found.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}

