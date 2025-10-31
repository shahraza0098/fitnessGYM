


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
//     // Get the Clerk client instance
//     const client = await clerkClient();
    
//     // First, check if a user already exists with this email
//     const existing = await client.users.getUserList({ emailAddress: [email] });

//     let userId;
//     if (existing?.data?.length) {
//       // User already exists — just add them to the org
//       userId = existing.data[0].id;
//       await client.organizations.createOrganizationMembership({
//         organizationId: orgId,
//         userId: userId,
//         role: role === "MANAGER" ? "org:admin" : "org:member",
//       });
//     } else {
//       // Create an organization invitation
//       const user = await clerkClient.users.createUser({
//       emailAddress: [email],
//       password: '12345678', // Temporary password, user should change it later
//       firstName: name,
//     })
//     //   const invite = await client.organizations.createOrganizationInvitation({
//     //     organizationId: orgId,
//     //     emailAddress: email,
//     //     role: role === "MANAGER" ? "org:admin" : "org:member",
//     //   });

//     //   return invite.id;
//     }

//     return userId;
//   } catch (err) {
//     console.error("❌ Clerk invite error:", err);
//     throw new Error("Failed to invite user to organization");
//   }
// }


// // src/lib/clerkOrg.js
// import { clerkClient } from "@clerk/nextjs/server";

// /**
//  * Create a user and add them to a specific Clerk Organization (Gym)
//  * @param {Object} params
//  * @param {string} params.orgId - The Clerk org ID of the gym
//  * @param {string} params.email - The user's email
//  * @param {string} params.name - The user's name (will be split into first/last)
//  * @param {string} params.role - "MANAGER" or "TRAINER"
//  * @returns {Promise<string>} - The new user's Clerk user ID
//  */
// export async function createUserAndAddToOrg({ orgId, email, name, role }) {


//   try {
//     const client = await clerkClient();
//     console.log("email passed to function", email);
    
//     // Check if user already exists
//     const existing = await client.users.getUserList({ emailAddress: [email] });

//     let userId;
    
//     if (existing?.data?.length) {
//       // User already exists — just add them to the org
//       userId = existing.data[0].id;
//     } else {
//       // Split name into first and last name
//       const nameParts = name.split(' ');
//       const firstName = nameParts[0] || '';
//       const lastName = nameParts.slice(1).join(' ') || '';
      
//       // Create new user
//       const newUser = await client.users.createUser({
//         emailAddress: [email],
//         password: 'TempPass123!', // Temporary password
//         firstName: firstName,
//         lastName: lastName,
//         username: email.split('@')[0], // Generate username from email
//         // skipPasswordRequirement: true, // Set to true if you don't want to require password
//       });
      
//       userId = newUser.id;
//     }
    
//     // Add user to organization
//     await client.organizations.createOrganizationMembership({
//       organizationId: orgId,
//       userId: userId,
//       role: role === "MANAGER" ? "org:admin" : "org:member",
//     });

//     return userId;
//   } catch (err) {
//     console.error("❌ Clerk error:", err);
//     throw new Error("Failed to create user and add to organization");
//   }
// }



// src/lib/clerkOrg.js
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Creates (or finds) a user and adds them to a specific Clerk Organization (Gym)
 * Uses Clerk SDK for lookups and organization handling,
 * and Clerk REST API for user creation (for more flexibility).
 *
 * @param {Object} params
 * @param {string} params.orgId - The Clerk org ID of the gym
 * @param {string} params.email - The user's email
 * @param {string} params.name - The user's full name
 * @param {string} params.role - "MANAGER" or "TRAINER"
 * @returns {Promise<string>} - The user's Clerk ID
 */
export async function createUserAndAddToOrg({ orgId, email, name, role }) {
  try {
    const client = await clerkClient();

    function generateUsername(email) {
      const localPart = email.split('@')[0];
      const username = localPart.replace(/[^a-zA-Z0-9]/g, '');
      return username;
      }

      const username = generateUsername(email);

    // Step 1: Check if the user already exists in Clerk
    const existing = await client.users.getUserList({ emailAddress: [email] });
    let userId;

    if (existing?.data?.length) {
      // ✅ User already exists
      userId = existing.data[0].id;
      console.log(`✅ Existing Clerk user found: ${userId}`);
    } else {
      // Step 2: Create user via Clerk REST API (more reliable for invites/migrations)
      const [firstName, ...rest] = name.trim().split(" ");
      const lastName = rest.join(" ");

      //function to generate username from email
      
      

      const response = await fetch("https://api.clerk.com/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email_address: [email],
          first_name: firstName || "",
          last_name: lastName || "",
          username: username,
          skip_password_requirement: true, // user signs in via magic link / SSO
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Clerk API create user failed:", errText);
        throw new Error(`Clerk API error (${response.status}): ${errText}`);
      }

      const newUser = await response.json();
      log("✅ New Clerk user created via REST API:", newUser);
      userId = newUser.id;
    }

    // Step 3: Add user to organization
    try {
      await client.organizations.createOrganizationMembership({
        organizationId: orgId,
        userId,
        role: role === "MANAGER" ? "org:admin" : "org:member",
      });
    } catch (orgError) {
      if (orgError.errors?.[0]?.code === "organization_membership_exists") {
        console.log(`ℹ️ User ${email} is already part of org ${orgId}`);
      } else {
        console.error("❌ Error adding user to org:", orgError);
        throw orgError;
      }
    }

    return userId;
  } catch (err) {
    console.error("❌ Clerk error in createUserAndAddToOrg:", err);
    throw new Error("Failed to create or add user to organization");
  }
}
