"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="px-3 py-1 rounded hover:bg-gray-300"
    >
      戻る
    </Button>
  );
}
