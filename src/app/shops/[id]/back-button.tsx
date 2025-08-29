"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="rounded hover:bg-gray-300"
      size="lg"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
