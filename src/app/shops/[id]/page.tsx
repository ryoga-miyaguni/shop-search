import { notFound } from "next/navigation";
import { Shop } from "@/types";
import ShopHeader from "./ShopHeader";
import ShopDetails from "./shop-details";
import ShopReviews from "./reviews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

async function fetchShopById(id: string): Promise<Shop | null> {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  if (!host) throw new Error("NEXT_PUBLIC_API_HOST is not set");

  const res = await fetch(`${host}/api/shops/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// サーバーコンポーネント
export default async function ShopPage({ params }: { params: { id: string } }) {
  const shop = await fetchShopById(params.id);
  if (!shop) notFound();

  return (
    <div className="h-screen flex flex-col">
      {/* ヘッダーはクライアントコンポーネント */}
      <ShopHeader shopName={shop.name} />

      {/* 店舗画像＋名前 */}
      {shop.photo?.pc?.l && (
        <div className="relative w-full h-[30vh] flex-shrink-0">
          <Image src={shop.photo.pc.l} alt={shop.name} fill className="object-cover" />
        </div>
      )}

      <div className="px-4 py-2 bg-white shadow-sm text-center">
        <h2 className="text-xl font-bold truncate">{shop.name}</h2>
      </div>

      {/* タブ部分 */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">店舗情報</TabsTrigger>
            <TabsTrigger value="reviews">レビュー</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <ShopDetails shop={shop} />
          </TabsContent>

          <TabsContent value="reviews">
            <ShopReviews shopId={shop.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
