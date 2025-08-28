"use client";

export default function ShopHeader({ shopName }: { shopName: string }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-20">
      <button
        onClick={() => history.back()}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        戻る
      </button>
      <h1 className="text-lg font-bold truncate text-center flex-1 mx-2">{shopName}</h1>
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
        ログイン
      </button>
    </header>
  );
}
