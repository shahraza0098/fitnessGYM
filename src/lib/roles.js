// export const ROLE_PERMISSIONS = {
//   OWNER: [
//     "gym:create",
//     "gym:edit",
//     "gym:delete",
//     "staff:add",
//     "staff:remove",
//     "member:add",
//     "member:remove",
//     "billing:manage",
//   ],
//   MANAGER: [
//     "staff:add",
//     "staff:edit",
//     "member:add",
//     "member:remove",
//     "attendance:manage",
//   ],
//   TRAINER: [
//     "member:view",
//     "attendance:mark",
//     "workout:manage",
//   ],
//   RECEPTIONIST: [
//     "member:add",
//     "member:view",
//     "attendance:view",
//   ],
//   STAFF: [],
// };


// src/lib/roles.js
export const BranchRole = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  TRAINER: "TRAINER",
  RECEPTIONIST: "RECEPTIONIST",
  STAFF: "STAFF",
};

export const ROLE_PERMISSIONS = {
  OWNER: [
    "gym:create",
    "gym:edit",
    "gym:delete",
    "staff:add",
    "staff:remove",
    "member:add",
    "member:remove",
    "billing:manage",
  ],
  MANAGER: [
    "staff:add",
    "staff:edit",
    "member:add",
    "member:remove",
    "attendance:manage",
  ],
  TRAINER: ["member:view", "attendance:mark", "workout:manage"],
  RECEPTIONIST: ["member:add", "member:view", "attendance:view"],
  STAFF: [],
};
