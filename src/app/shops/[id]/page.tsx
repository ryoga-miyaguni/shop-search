import { notFound } from "next/navigation";
import { Shop } from "@/types";
import Footer from "@/components/footer";
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
    <div className="flex flex-col bg-gray-50">
      {/* 固定ヘッダー（ナビゲーション用）*/}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm">
        <Header />
      </div>

      {/* 左上に重ねる戻るボタン */}
      <div className="fixed top-3 left-3 z-40">
        <BackButton />
      </div>


      <main className="pt-16">
        {/* 店舗画像セクション */}
        <section className="relative w-full h-[35vh] overflow-hidden">
          {shop.photo?.pc?.l && (
            <Image
              src={shop.photo.pc.l}
              alt={shop.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          )}
        </section>
        
        <Tabs defaultValue="info">
          {/* 店舗名とタブ（sticky部分） */}
          <div className="sticky top-14 z-20 w-full bg-white shadow-md">
            <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-extrabold text-gray-900 text-center">
                  {shop.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500 text-center">
                  {shop.genre.name}
                </p>
              </div>

              <div className="mt-3">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="info"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    店舗情報
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    レビュー
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>

          {/* タブの中身 */}
          <div className="mx-auto max-w-4xl px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-6">
            <TabsContent value="info">
              <ShopDetails shop={shop} />
            </TabsContent>
            <TabsContent value="reviews">
              <ShopReviews shopId={shop.id} />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
