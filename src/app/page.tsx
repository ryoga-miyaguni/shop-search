"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shop } from "@/types";
import Link from "next/link";
import { ChevronDown, ChevronUp, MapPin, Tag, Wallet, Users } from "lucide-react";

interface SearchFormState {
  basho: string;
  janru: string;
  kane: string;
  ninzu: string;
  kodawari: string[];
  count: string;
  page: number;
}

interface SearchResponse {
  error?: string;
  shops: Shop[];
  total_returned?: number;
  total_available?: number;
  url?: string;
}

const GENRE_OPTIONS = [
  { code: "", label: "未指定" },
  { code: "G001", label: "居酒屋" },
  { code: "G002", label: "ダイニングバー・バル" },
  { code: "G003", label: "創作料理" },
  { code: "G004", label: "和食" },
  { code: "G005", label: "洋食" },
  { code: "G006", label: "イタリアン・フレンチ" },
  { code: "G007", label: "中華" },
  { code: "G008", label: "焼肉・ホルモン" },
  { code: "G017", label: "韓国料理" },
  { code: "G009", label: "アジア・エスニック料理" },
  { code: "G010", label: "各国料理" },
  { code: "G011", label: "カラオケ・パーティ" },
  { code: "G012", label: "バー・カクテル" },
  { code: "G013", label: "ラーメン" },
  { code: "G016", label: "お好み焼き・もんじゃ" },
  { code: "G014", label: "カフェ・スイーツ" },
  { code: "G015", label: "その他グルメ" },
];

const BUDGET_OPTIONS = [
  { code: "", label: "未指定" },
  { code: "B001", label: "~500円" },
  { code: "B002", label: "501~1,000円" },
  { code: "B003", label: "1,001~1,500円" },
  { code: "B008", label: "2,001~3,000円" },
  { code: "B010", label: "3,001~4,000円" },
  { code: "B011", label: "4,001~5,000円" },
  { code: "B017", label: "5,001~7,000円" },
  { code: "B018", label: "7,001~10,000円" },
];

const KODAWARI_FLAGS = ["個室", "飲み放題", "喫煙可", "駐車場"];
const DEFAULT_COUNT = "10";

export default function Page() {
  const [form, setForm] = useState<SearchFormState>({
    basho: "",
    janru: "",
    kane: "",
    ninzu: "",
    kodawari: [],
    count: DEFAULT_COUNT,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isKodawariOpen, setIsKodawariOpen] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && !isSearchFormVisible) {
        setIsSearchFormVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchFormVisible]);

  function updateField<K extends keyof SearchFormState>(
    key: K,
    value: SearchFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleKodawari(v: string) {
    setForm((prev) => {
      const exists = prev.kodawari.includes(v);
      return {
        ...prev,
        kodawari: exists
          ? prev.kodawari.filter((k) => k !== v)
          : [...prev.kodawari, v],
      };
    });
  }

  async function callSearchApi(currentForm: SearchFormState): Promise<SearchResponse> {
    const { page, count, kodawari, ...payload } = currentForm;
    const c = parseInt(count || "10", 10);
    const start = (page - 1) * c + 1;

    const query = new URLSearchParams();

    for (const [key, value] of Object.entries({ ...payload, count: c, start })) {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    }

    if (kodawari && kodawari.length > 0) {
      kodawari.forEach(v => query.append("kodawari", v));
    }

    const r = await fetch(`/api/search?${query.toString()}`);
    const json: SearchResponse = await r.json();
    if (!r.ok || json.error) {
      throw new Error(json.error || `HTTP ${r.status}`);
    }
    return json;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await callSearchApi(form);
      setResult(data);
      setIsSearchFormVisible(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-14 px-4 md:px-8 lg:px-12 space-y-8">
      <button
        type="button"
        onClick={() => {
          if (isSearchFormVisible) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          setIsSearchFormVisible(!isSearchFormVisible);
        }}
        aria-label={isSearchFormVisible ? "検索フォームを閉じる" : "検索フォームを開く"}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center
                   bg-primary text-primary-foreground hover:bg-primary/90
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        {isSearchFormVisible ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>

      {isSearchFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border rounded-lg p-6 bg-card shadow-sm"
        >
          <h1 className="text-xl font-semibold">店舗検索</h1>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">エリア検索</label>
              <Input
                value={form.basho}
                onChange={(e) => updateField("basho", e.target.value)}
                placeholder="例: 那覇 おもろまち"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">ジャンル</label>
              <Select
                value={form.janru}
                onValueChange={(v) => updateField("janru", v === "__empty" ? "" : v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択" />
                </SelectTrigger>
                <SelectContent>
                  {GENRE_OPTIONS.map((g) => (
                    <SelectItem
                      key={g.code || "none"}
                      value={g.code === "" ? "__empty" : g.code}
                    >
                      {g.label || "未指定"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">予算（1人あたり）</label>
              <Select
                value={form.kane}
                onValueChange={(v) => updateField("kane", v === "__empty" ? "" : v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((b) => (
                    <SelectItem
                      key={b.code || "none"}
                      value={b.code === "" ? "__empty" : b.code}
                    >
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">人数</label>
              <Input
                type="number"
                min={1}
                value={form.ninzu}
                onChange={(e) => updateField("ninzu", e.target.value)}
                placeholder="例: 4"
              />
            </div>

            <div className="basis-full col-span-2">
              <button
                type="button"
                onClick={() => setIsKodawariOpen(!isKodawariOpen)}
                className="w-full text-left font-medium mb-2 flex items-center"
              >
                {isKodawariOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                <span className="text-sm">詳細な検索</span>
              </button>
              {isKodawariOpen && (
                <div className="flex flex-wrap gap-4 text-sm p-4 border rounded-md">
                  {KODAWARI_FLAGS.map((flag) => {
                    const checked = form.kodawari.includes(flag);
                    return (
                      <label
                        key={flag}
                        className="inline-flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          checked={checked}
                          onChange={() => toggleKodawari(flag)}
                        />
                        <span>{flag}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "検索中..." : "検索"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setForm({
                  basho: "",
                  janru: "",
                  kane: "",
                  ninzu: "",
                  kodawari: [],
                  count: DEFAULT_COUNT,
                  page: 1,
                });
                setResult(null);
                setError(null);
              }}
            >
              リセット
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              エラー: {error}
            </p>
          )}
          {result && !error && (
            <p className="text-sm text-muted-foreground">
              {result.total_available
                ? `該当件数: ${result.total_available}`
                : ""}
            </p>
          )}
        </form>
      )}
      {result && !error && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>検索結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.shops.length === 0 ? (
              <p>該当する店舗が見つかりませんでした。</p>
            ) : (
              result.shops.map((shop) => (
                <Link href={`/shops/${shop.id}`} key={shop.id} className="block border-b pb-4 last:border-0 hover:bg-muted/50 p-4 rounded-lg cursor-pointer no-underline text-current">
                  <h2 className="text-lg font-semibold">{shop.name}</h2>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{shop.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      <span>{shop.genre.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-1" />
                      <span>{shop.budget.name}</span>
                    </div>
                    {shop.party_capacity && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{shop.party_capacity}人</span>
                      </div>
                    )}
                  </div>
                  {shop.photo && shop.photo.pc && (
                    <img
                      src={shop.photo.pc.l}
                      alt={shop.name}
                      className="mt-2 max-w-xs rounded"
                    />
                  )}
                </Link>
              ))
            )}
            {result.total_available && result.total_available > parseInt(form.count, 10) && (
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  disabled={form.page === 1 || loading}
                  onClick={async () => {
                    if (form.page > 1) {
                      const newPage = form.page - 1;
                      updateField("page", newPage);
                      setLoading(true);
                      setError(null);
                      try {
                        const data = await callSearchApi({ ...form, page: newPage });
                        setResult(data);
                      } catch (err) {
                        setError((err as Error).message);
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                >
                  前のページ
                </Button>
                <span>Page {form.page}</span>
                <Button
                  variant="outline"
                  disabled={
                    loading ||
                    (result.total_returned || 0) < parseInt(form.count, 10)
                  }
                  onClick={async () => {
                    if (form.page < Math.ceil(result.total_available / parseInt(form.count, 10))) {
                      const newPage = form.page + 1;
                      updateField("page", newPage);
                      setLoading(true);
                      setError(null);
                      try {
                        const data = await callSearchApi({ ...form, page: newPage });
                        setResult(data);
                      } catch (err) {
                        setError((err as Error).message);
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                >
                  次のページ
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      </div>
    );
}
