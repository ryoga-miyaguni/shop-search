"use client";

import { Shop } from "@/types";
import { Slider } from "@/components/ui/slider";

interface ShopDetailsProps {
  shop: Shop;
}

export default function ShopDetails({ shop }: ShopDetailsProps) {
  return (
    <div className="space-y-2">
      <div>
        <p><strong>住所:</strong> {shop.address}</p>
        <p><strong>ジャンル:</strong> {shop.genre.name}</p>
        <p><strong>予算:</strong> {shop.budget.name}</p>
        <p><strong>定休日:</strong> {shop.close}曜日</p>
        <p><strong>人数:</strong> {shop.capacity} 人</p>
      </div>

      <ShopSliders avgVibe={2} avgOccasion={3} />

      <div className="border-t pt-4">
        <p><strong>営業時間:</strong> {shop.open}</p>
        <p><strong>アクセス:</strong> {shop.access}</p>
        <p><strong>駐車場:</strong> {shop.parking}</p>
        <p><strong>喫煙:</strong> {shop.non_smoking ? "不可" : "可"}</p>
        <p><strong>Wi-Fi:</strong> {shop.wifi}</p>
        <p><strong>ペット可:</strong> {shop.pet}</p>
        <p><strong>子供連れ:</strong> {shop.child}</p>
        <p><strong>詳細:</strong> {shop.shop_detail_memo}</p>
        <p><strong>クレジットカード:</strong> {shop.card}</p>
        <p><strong>飲み放題:</strong> {shop.free_drink}</p>
        <p><strong>食べ放題:</strong> {shop.free_food}</p>
        <p><strong>テレビ:</strong> {shop.tv}</p>
      </div>
    </div>
  );
}

export function ShopSliders({ avgVibe, avgOccasion }: { avgVibe: number; avgOccasion: number }) {
  const marks = [1, 2, 3, 4];
  return (
    <div className="space-y-8 p-4 max-w-md mx-auto">
      <div>
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span>落ち着く</span>
          <span>にぎやか</span>
        </div>
        <Slider
          value={[avgVibe]}
          min={1}
          max={4}
          step={1}
          className="w-full pointer-events-none"
        />
        <div className="flex justify-between text-xs mt-1">
          {marks.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span>特別な日</span>
          <span>普段使い</span>
        </div>
        <Slider
          value={[avgOccasion]}
          min={1}
          max={4}
          step={1}
          className="w-full pointer-events-none"
        />
        <div className="flex justify-between text-xs mt-1">
          {marks.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}
