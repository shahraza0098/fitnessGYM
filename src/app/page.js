import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Gym Management System</h1>
       {/* add button to navigate to select-gym page */}
        <div className="mt-10">
          <a
            href="/select-gym"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
