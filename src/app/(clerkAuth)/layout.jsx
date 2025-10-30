// import React from "react";

// function ClerkLayout({ children }) {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#231942] via-[#5e548e] to-[#9f86c0] text-white">
//       {/* ✨ Background texture */}
//       <div
//         className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10 pointer-events-none"
//         aria-hidden="true"
//       ></div>

//       {/* Soft glow blobs */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#be95c4] rounded-full blur-[150px] opacity-20"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e0b1cb] rounded-full blur-[150px] opacity-20"></div>

//       {/* Center container */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 w-[90%] max-w-md">
//         {/* Welcome text */}
//         <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-6 shadow-xl">
//           <h1 className="text-3xl font-bold text-white">
//             Welcome to <span className="text-[#e0b1cb]">FitCore</span>
//           </h1>
//           <p className="text-sm text-white/80 mt-1">
//             Sign in or create your account to continue
//           </p>
//         </div>

//         {/* Clerk form card */}
//         <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClerkLayout;
"use client";
import React from "react";

export default function ClerkLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#231942] via-[#5e548e] to-[#9f86c0] text-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')",
        }}
      />

      {/* Decorative blur blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 md:w-96 md:h-96 bg-[#be95c4] rounded-full blur-[100px] opacity-20" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 md:w-96 md:h-96 bg-[#e0b1cb] rounded-full blur-[100px] opacity-20" />

      {/* Content wrapper with safe padding */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Welcome Card */}
        <div className="w-full max-w-md text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-6 px-5 shadow-xl">
          <h1 className="text-3xl font-bold text-white">
            Welcome to <span className="text-[#e0b1cb]">FitCore</span>
          </h1>
          <p className="text-sm text-white/80 mt-1">
            Sign in or create your account to continue
          </p>
        </div>

        {/* Clerk Auth Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-4 sm:p-6 box-border overflow-hidden">
          <div
            className="w-full overflow-hidden"
            style={{
              maxWidth: "100%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Add wrapper to prevent overflow */}
            <div className="w-full max-w-[360px] sm:max-w-[380px] md:max-w-[400px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
