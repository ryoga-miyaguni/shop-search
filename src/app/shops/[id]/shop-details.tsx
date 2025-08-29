"use client";

import { Shop } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Tag, Wallet, Calendar, Users, Clock, FileText } from "lucide-react";
import { Wifi,Car, Cigarette, Dog, Baby, CreditCard, Utensils, Tv } from "lucide-react";

interface ShopDetailsProps {
  shop: Shop;
}

export default function ShopDetails({ shop }: ShopDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-1 pb-3 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">住所</p>
                <p className="font-medium">{shop.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">ジャンル</p>
                <p className="font-medium">{shop.genre.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">予算</p>
                <p className="font-medium">{shop.budget.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">定休日</p>
                <p className="font-medium">{shop.close}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">収容人数</p>
                <p className="font-medium">{shop.capacity} 人</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 仮データを入力中 */}
      <AtmosphereSlider />
      
      <Card>
        <CardHeader>
          <CardTitle>お店の詳細</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <InfoItem icon={<Clock />} label="営業時間" value={shop.open} />
            <InfoItem icon={<MapPin />} label="アクセス" value={shop.access} />
            <InfoItem icon={<Car />} label="駐車場" value={shop.parking} />
            <InfoItem icon={<Cigarette />} label="喫煙" value={shop.non_smoking ? "不可" : "可"} />
            <InfoItem icon={<Wifi />} label="Wi-Fi" value={shop.wifi} />
            <InfoItem icon={<Dog />} label="ペット可" value={shop.pet} />
            <InfoItem icon={<Baby />} label="子供連れ" value={shop.child} />
            <InfoItem icon={<CreditCard />} label="クレジットカード" value={shop.card} />
            <InfoItem icon={<Utensils />} label="飲み放題" value={shop.free_drink} />
            <InfoItem icon={<Utensils />} label="食べ放題" value={shop.free_food} />
            <InfoItem icon={<Tv />} label="テレビ" value={shop.tv} />
            <InfoItem icon={<FileText />} label="詳細" value={shop.shop_detail_memo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ヘルパーコンポーネント
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  if (!value || value.trim() === "") return null;
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-500">{icon}</div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export function AtmosphereSlider() {
  const reviews = [
    { score: 3 },
    { score: 4 },
    { score: 2 },
    { score: 2 },
  ];
  const averageRaw =
  reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;

// パーセンテージ換算（1=0%, 4=100%）
const averagePercent = ((averageRaw - 1) / (4 - 1)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">雰囲気・利用シーン</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* 落ち着く / にぎやか */}
        <div className="relative pb-4">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>落ち着く</span>
            <span>にぎやか</span>
          </div>

          {/* 背景バー */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-300 via-gray-200 to-pink-300 rounded-full relative">
            {/* 平均値マーカー */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              style={{ left: `${averagePercent}%` }}
            >
              <div className="w-5 h-5 bg-white rounded-full border border-gray-400 shadow-lg" />
            </div>

            {/* バー内部目盛り */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[2px] h-2 bg-gray-700" />
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* 特別な日 / 普段使い */}
        <div className="relative h-6"> {/* 高さをバー＋目盛り分確保 */}
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>普段使い</span>
            <span>特別な日</span>
          </div>

          {/* 背景バー */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-300 via-gray-200 to-pink-300 rounded-full relative">
            {/* 平均値マーカー */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              style={{ left: `${averagePercent}%` }}
            >
              <div className="w-5 h-5 bg-white rounded-full border border-gray-400 shadow-lg" />
            </div>

            {/* バー内部目盛り */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[2px] h-2 bg-gray-700" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
