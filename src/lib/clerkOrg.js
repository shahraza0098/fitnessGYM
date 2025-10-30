// // src/lib/clerkOrg.js
// import { clerkClient } from "@clerk/nextjs/server";

// /**
//  * Invite or create a user inside a specific Clerk Organization (Gym)
//  * @param {Object} params
//  * @param {string} params.orgId - The Clerk org ID of the gym
//  * @param {string} params.email - The user's email
//  * @param {string} params.name - The user's name
//  * @param {string} params.role - "MANAGER" or "TRAINER"
//  * @returns {Promise<string>} - The new user's Clerk user ID
//  */
// export async function inviteUserToOrg({ orgId, email, name, role }) {
//   try {
//     // First, check if a user already exists with this email
//     const existing = await clerkClient.users.getUserList({ emailAddress: [email] });

//     let userId;
//     if (existing?.length) {
//       // User already exists — just add them to the org
//       userId = existing[0].id;
//       await clerkClient.organizations.createOrganizationMembership({
//         organizationId: orgId,
//         userId,
//         role: role === "MANAGER" ? "admin" : "basic_member",
//       });
//     } else {
//       // Create an organization invitation
//       const invite = await clerkClient.organizations.createOrganizationInvitation({
//         organizationId: orgId,
//         emailAddress: email,
//         role: role === "MANAGER" ? "admin" : "basic_member",
//       });

//       // Clerk sends an email invitation — user will appear once they accept
//       // For now, we don’t have a userId until acceptance.
//       return invite.id; // You can store this temporarily if needed
//     }

//     return userId;
//   } catch (err) {
//     console.error("❌ Clerk invite error:", err);
//     throw new Error("Failed to invite user to organization");
//   }
// }



// src/lib/clerkOrg.js
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Invite or create a user inside a specific Clerk Organization (Gym)
 * @param {Object} params
 * @param {string} params.orgId - The Clerk org ID of the gym
 * @param {string} params.email - The user's email
 * @param {string} params.name - The user's name
 * @param {string} params.role - "MANAGER" or "TRAINER"
 * @returns {Promise<string>} - The new user's Clerk user ID
 */
export async function inviteUserToOrg({ orgId, email, name, role }) {
  try {
    // Get the Clerk client instance
    const client = await clerkClient();
    
    // First, check if a user already exists with this email
    const existing = await client.users.getUserList({ emailAddress: [email] });

    let userId;
    if (existing?.data?.length) {
      // User already exists — just add them to the org
      userId = existing.data[0].id;
      await client.organizations.createOrganizationMembership({
        organizationId: orgId,
        userId: userId,
        role: role === "MANAGER" ? "org:admin" : "org:member",
      });
    } else {
      // Create an organization invitation
      const invite = await client.organizations.createOrganizationInvitation({
        organizationId: orgId,
        emailAddress: email,
        role: role === "MANAGER" ? "org:admin" : "org:member",
      });

      return invite.id;
    }

    return userId;
  } catch (err) {
    console.error("❌ Clerk invite error:", err);
    throw new Error("Failed to invite user to organization");
  }
}