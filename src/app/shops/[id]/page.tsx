import { notFound } from "next/navigation";
import { Shop } from "@/types";
import Footer from"@/components/footer";
import ShopDetails from "./shop-details";
import ShopReviews from "./reviews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import BackButton from "./back-button";
import Header from "@/components/header";

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
      {/* ヘッダー */}
      <Header />

      {/* 画像＋店名＋タブを固定 */}
      <div className="sticky top-0 z-20 bg-white">
        {shop.photo?.pc?.l && (
          <div className="w-full h-[30vh] relative">
            <Image src={shop.photo.pc.l} alt={shop.name} fill className="object-cover" />
          </div>
        )}
        <div className="px-4 py-2 text-center">
          <h2 className="text-2xl font-extrabold">{shop.name}</h2>
          <BackButton />
          <div className="mt-2 h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="w-full flex justify-center bg-white">
            <TabsTrigger value="info" className="font-bold px-6 py-2">
              店舗情報
            </TabsTrigger>
            <TabsTrigger value="reviews" className="font-bold px-6 py-2">
              レビュー
            </TabsTrigger>
          </TabsList>

          {/* タブの内容 */}
          <TabsContent value="info">
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 30vh - 6rem)" }}>
              <ShopDetails shop={shop} />
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 30vh - 6rem)" }}>
              <ShopReviews shopId={shop.id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="overflow-y-auto">
        <Footer />
      </div>
    </div>
  );
}
