import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <Image
        src="https://nextjs.org/icons/next.svg"
        alt="Next.js logo"
        width={120}
        height={30}
        className="dark:invert mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">Tailwind CSS is working 🎉</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        If you can see this colorful background and white text, Tailwind is configured correctly in
        your Next.js app!
      </p>

      <button className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-100 transition">
        Click Me
      </button>
    </div>
  );
}
