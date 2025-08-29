import { CircleUserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b">
      <nav className="w-full py-2 flex items-center justify-end px-4">
        {/* ログインボタン */}
        <button
          className="p-1 text-purple transition"
          aria-label="ログイン"
        >
          <CircleUserRound size={33} />
        </button>
      </nav>
    </header>
  );
}

//  className="p-2 rounded-full bg-blue-500 text-white shadow hover:bg-blue-600 transition"
