"use client";
 
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchForm from "./search-form";
import { Shop } from "@/types";
 
export default function GourmetsClient({
  initialShops,
  initialQuery,
}: {
  initialShops: Shop[];
  initialQuery?: string;
}) {
  const [searchResults, setSearchResults] = useState(initialShops);
  const [currentQuery, setCurrentQuery] = useState(initialQuery || "");
 
  const handleSearchResults = (results: Shop[], query: string) => {
    setSearchResults(results);
    setCurrentQuery(query);
  };
 
  return (
    <div className="flex flex-col items-center min-h-screen pt-36 px-8">
      <SearchForm onSearchResults={handleSearchResults} />
 
      <div className="mt-4 text-gray-600">
        {currentQuery && `検索クエリ: "${currentQuery}"`}
      </div>
 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full mt-8">
        {searchResults.length > 0 ? (
          searchResults.map((shop) => (
            <Card key={shop.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4 p-6">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={shop.photo.pc.m} className="object-cover" />
                  <AvatarFallback>{shop.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{shop.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {shop.address || "住所情報なし"}
                </p>
                <div className="bg-blue-100 rounded-lg p-3 inline-block">
                  <p className="text-sm font-medium text-blue-800">
                    {shop.genre?.name || "ジャンル情報なし"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">
              {currentQuery
                ? `"${currentQuery}" に一致する店舗は見つかりませんでした`
                : "検索条件を入力してください"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}