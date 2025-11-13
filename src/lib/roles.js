// // export const ROLE_PERMISSIONS = {
// //   OWNER: [
// //     "gym:create",
// //     "gym:edit",
// //     "gym:delete",
// //     "staff:add",
// //     "staff:remove",
// //     "member:add",
// //     "member:remove",
// //     "billing:manage",
// //   ],
// //   MANAGER: [
// //     "staff:add",
// //     "staff:edit",
// //     "member:add",
// //     "member:remove",
// //     "attendance:manage",
// //   ],
// //   TRAINER: [
// //     "member:view",
// //     "attendance:mark",
// //     "workout:manage",
// //   ],
// //   RECEPTIONIST: [
// //     "member:add",
// //     "member:view",
// //     "attendance:view",
// //   ],
// //   STAFF: [],
// // };


// // src/lib/roles.js
// export const BranchRole = {
//   OWNER: "OWNER",
//   MANAGER: "MANAGER",
//   TRAINER: "TRAINER",
// };

// export const ROLE_PERMISSIONS = {
//   OWNER: [
//     "gym:create",
//     "gym:edit",
//     "gym:delete",
//     "staff:add",
//     "staff:edit",
//     "staff:remove",
//     "member:add",
//     "member:remove",
//     "member:edit",
//     "billing:manage",
//   ],
//   MANAGER: [
//     "staff:add",
//     "staff:edit",
//     "member:add",
//     "member:remove",
//     "attendance:manage",
//     "payment:create",
//     "payment:edit",
//     "discount:manage",
//     "class:schedule",

//   ],
//   TRAINER: [
//     "member:view",
//     "attendance:mark",
//     "dietplan:create",
//     "dietplan:edit",

//   ],
  
// };



// -------------------------------
// Role Definitions
// -------------------------------
export const BranchRole = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  TRAINER: "TRAINER",
};

// -------------------------------
// Role-based Permissions
// -------------------------------
export const ROLE_PERMISSIONS = {
  OWNER: [
    // Gym Management
    "gym:create",
    "gym:edit",
    "gym:delete",

    // Staff Management
    "staff:add",
    "staff:edit",
    "staff:remove",
    "staff:view",

    // Member Management
    "member:add",
    "member:edit",
    "member:remove",
    "member:view",

    // Attendance
    "attendance:mark",
    "attendance:manage",
    "attendance:view",

    // Membership Plans
    "plan:create",
    "plan:edit",
    "plan:delete",
    "plan:view",

    // Workout Plans & Exercises
    "workout:create",
    "workout:edit",
    "workout:delete",
    "exercise:create",
    "exercise:edit",
    "exercise:delete",

    // Diet & Meal Plans
    "dietplan:create",
    "dietplan:edit",
    "dietplan:delete",
    "diettemplate:create",
    "diettemplate:edit",
    "diettemplate:delete",

    // Payment & Billing
    "payment:create",
    "payment:edit",
    "payment:view",
    "billing:manage",
    "discount:create",
    "discount:edit",
    "discount:delete",

    // Class Scheduling
    "class:schedule",
    "class:edit",
    "class:cancel",
    "booking:view",
    "booking:manage",

    // Equipment Management
    "equipment:add",
    "equipment:edit",
    "equipment:remove",
    "equipment:view",

    // HR: Payrolls & Performance
    "payroll:manage",
    "review:manage",

    // Notifications & Feedback
    "notification:create",
    "notification:view",
    "feedback:view",

    // Reports / Analytics / Audit
    "report:view",
    "audit:view",
    "offday:manage",
  ],

  MANAGER: [
    // Staff Management (limited)
    "staff:add",
    "staff:edit",
    "staff:view",

    // Member Management
    "member:add",
    "member:edit",
    "member:remove",
    "member:view",

    // Attendance
    "attendance:mark",
    "attendance:manage",
    "attendance:view",

    // Membership Plans
    "plan:view",

    // Workout & Nutrition
    "workout:create",
    "workout:edit",
    "dietplan:create",
    "dietplan:edit",

    // Payments & Billing
    "payment:create",
    "payment:edit",
    "payment:view",
    "discount:manage",
    "billing:manage",

    // Class Scheduling
    "class:schedule",
    "class:edit",
    "class:view",
    "booking:view",

    // Equipment (view only)
    "equipment:view",

    // HR
    "payroll:view",
    "review:view",

    // Notifications & Feedback
    "notification:create",
    "notification:view",
    "feedback:view",

    // Analytics
    "report:view",
    "offday:view",
  ],

  TRAINER: [
    // Member
    "member:view",

    // Attendance (mark only)
    "attendance:mark",
    "attendance:view",

    // Workout & Diet
    "workout:create",
    "workout:edit",
    "dietplan:create",
    "dietplan:edit",

    // Classes (assigned to trainer)
    "class:view",
    "booking:view",

    // Feedback & Notification
    "feedback:view",
    "notification:view",

    // Personal Payroll or Performance
    "payroll:view:self",
    "review:view:self",
  ],
};

// -------------------------------
// Utility: check if a user role has permission
// -------------------------------
export function hasPermission(role, permission) {

  if(!role || !permission) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission);
}
