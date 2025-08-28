// ...existing code...

import { NextRequest, NextResponse } from "next/server";
import type { Shop } from "@/types"; // 復元

// フロントから送られてくる検索ボディ
interface SearchBody {
  basho?: string;     // キーワード (場所/自由語)
  janru?: string;     // ジャンル (genre コード)
  kane?: string;      // 予算 (budget コード)
  ninzu?: string;     // 人数 (現在ロジック未使用)
  kodawari?: string[];// こだわりフラグ配列
  count?: number;     // 1ページ件数
  start?: number;     // 開始位置 (1 始まり)
  special_category?: string; // ★ 追加
}

// HotPepper API レスポンス簡易型
interface HotPepperApiResponse {
  results?: {
    shop?: Shop[];                 // 復元
    results_available?: number;
    results_returned?: string | number; // string ケース考慮
  };
}

// 既存 UI 用の React コンポーネント混入部分は削除しました

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

function mapKodawari(params: URLSearchParams, flags: string[]) {
  if (flags.includes("飲み放題")) params.set("free_drink", "1");
  if (flags.includes("個室")) params.set("private_room", "1");
  // 喫煙可: HotPepper は non_smoking=1 が「禁煙」。喫煙可指定を明確化する仕様がないためここでは非設定。
  // 例: 禁煙指定を追加したい場合 → if (flags.includes("禁煙")) params.set("non_smoking","1");
  if (flags.includes("駐車場")) params.set("parking", "1");
}

function buildParams(body: SearchBody, apiKey: string): URLSearchParams {
  const params = new URLSearchParams();
  params.set("key", apiKey);
  params.set("format", "json");

  // 件数 / start
  const count = body.count && body.count > 0 ? body.count : 10;
  params.set("count", String(count));
  if (body.start && body.start > 0) params.set("start", String(body.start));

  // キーワード
  if (body.basho) params.set("keyword", body.basho);
  // ジャンル
  if (body.janru) params.set("genre", body.janru);
  // 予算
  if (body.kane) params.set("budget", body.kane);
  // ★ 追加: 特集カテゴリ
  if (body.special_category) params.set("special_category", body.special_category);

  // // こだわり
  // if (Array.isArray(body.kodawari) && body.kodawari.length > 0) {
  //   mapKodawari(params, body.kodawari);
  // }

  return params;
}

// ラッパー戻り値型
interface WrappedSearchResult {
  shops: Shop[];               // 復元
  total_available: number;
  total_returned: number;
  url: string;
}

// HotPepper API 叩き & 整形ラッパー
async function searchHotPepper(body: SearchBody): Promise<WrappedSearchResult> { // export 削除
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) throw new APIError(500, "HOTPEPPER_API_KEY 未設定");

  const params = buildParams(body, apiKey);
  const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params.toString()}`;

  const upstream = await fetch(url, { cache: "no-store" });
  if (!upstream.ok) {
    throw new APIError(upstream.status, `Upstream Error ${upstream.status}`);
  }

  const json: HotPepperApiResponse = await upstream.json();
  const shops = (json.results?.shop ?? []) as Shop[];
  // results_returned は "10" のような文字列の可能性
  const totalAvailable = json.results?.results_available ?? 0;
  const rawReturned = json.results?.results_returned;
  const totalReturned =
    typeof rawReturned === "string"
      ? parseInt(rawReturned, 10)
      : rawReturned ?? shops.length;

  return {
    shops,                               // 復元
    total_available: totalAvailable,
    total_returned: totalReturned,
    url,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const body: SearchBody = {
      basho: searchParams.get("basho") ?? undefined,
      janru: searchParams.get("janru") ?? undefined,
      kane: searchParams.get("kane") ?? undefined,
      ninzu: searchParams.get("ninzu") ?? undefined,
      // kodawari: searchParams.getAll("kodawari"),
      // count: searchParams.has("count") ? Number(searchParams.get("count")) : undefined,
      // start: searchParams.has("start") ? Number(searchParams.get("start")) : undefined,
      special_category: searchParams.get("special_category") ?? undefined,
    };
    const result = await searchHotPepper(body);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof APIError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: SearchBody = await request.json();
    const result = await searchHotPepper(body);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof APIError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

