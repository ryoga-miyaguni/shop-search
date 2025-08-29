// ★主な追加・変更点: データベースと通信するためのPrismaをインポートします。
import prisma from "@/lib/prisma";
import FloatingActionButton from "./FloatingActionButton";
// propsで受け取る shopId の型定義はそのまま使います。
interface ShopReviewsProps {
  shopId: string;
}

// ★主な追加・変更点: async を追加し、このコンポーネントをサーバーコンポーネントに変更します。
// これにより、このファイル内で直接DBアクセスが可能になります。
export default async function ShopReviews({ shopId }: ShopReviewsProps) {
  
  // ★主な追加・変更点: propsで受け取ったshopIdを使い、DBからレビューを取得します。
  const reviews = await prisma.review.findMany({
    where: {
      store_id: shopId,
    },
  });

  // ★主な追加・変更点: 取得したレビューデータを表示するUIを追加します。
  return (
    <div className="mt-4 space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">日付: {review.inserted_at.toLocaleDateString()}</p>

            {/* ▼▼▼ ここから追加 ▼▼▼ */}
            <div className="flex items-center space-x-4 my-2">
              {/* usecaseの表示ロジック */}
              {review.usecase != null && ( // usecaseがnullでない場合のみ表示
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  利用シーン: {review.usecase <= 2 ? "特別な日" : "普段使い"}
                </span>
              )}

              {/* atmosphereの表示ロジック */}
              {review.atmosphere != null && ( // atmosphereがnullでない場合のみ表示
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  雰囲気: {review.atmosphere <= 2 ? "落ち着く" : "にぎやか"}
                </span>
              )}
            </div>
            {/* ▲▲▲ ここまで追加 ▲▲▲ */}

            <p className="text-black">{review.comment || "No comment"}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 p-4">No reviews found for this shop.</p>
      )} 
    <FloatingActionButton />
    </div>

  );
}
