"use client";

interface ShopReviewsProps {
  shopId: string;
}

export default function ShopReviews({ shopId }: ShopReviewsProps) {
  // shopId を使って API からレビューを取得することもできます
  return (
    <div className="text-gray-500 p-4">
      レビューはまだありません。
    </div>
  );
}
