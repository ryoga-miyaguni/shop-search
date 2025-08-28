import { NextResponse } from "next/server";

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

async function fetchHotpepperData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new APIError(
      response.status, `API request failed: ${response.statusText}`);
  }
  const data = await response.json();
  if (!data.results?.shop || data.results.shop.length === 0) {
    throw new APIError(404, "No shop found");
  }
  return data.results.shop;
}

function handleError(error: unknown) {
  console.error("Error:", error);
  if (error instanceof APIError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const key = process.env.HOTPEPPER_API_KEY;
    if (!key) {
      throw new APIError(500, "API key is not set");
    }

    const query = new URLSearchParams({
      key,
      format: "json",
      id: params.id,
    });

    const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`;
    const data = await fetchHotpepperData(url);

    return NextResponse.json(data[0]); // 1件だけ返す
  } catch (error) {
    return handleError(error);
  }
}
