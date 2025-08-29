"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

interface ReviewFormProps {
  onClose: () => void;
}

export default function ReviewForm({ onClose }: ReviewFormProps) {
  const [comment, setComment] = useState("");
  // 4段階評価のため、初期値を2か3に設定するのが一般的
  const [atmosphere, setAtmosphere] = useState([2]);
  const [usage, setUsage] = useState([2]);

  const handleSubmit = () => {
    console.log("投稿されたコメント:", comment);
    console.log("雰囲気の評価:", atmosphere[0]);
    console.log("使い方の評価:", usage[0]); // Added this line
    setComment("");
    setAtmosphere([2]);
    setUsage([2]); // Added this line
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>レビューを投稿</DialogTitle>
        <DialogDescription>
          このお店のレビューをしてください。
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-8"> {/* 見やすさのため少し余白を調整 */}

        {/* スライダーのセクション */}
        <div className="relative pt-2">
          <label className="text-sm font-medium">雰囲気</label>
          {/* ★変更なし: 4段階評価としてこの設定は正しい */}
          <Slider
            value={atmosphere}
            onValueChange={setAtmosphere}
            max={4}
            min={1}
            step={1}
            className="my-4"
          />
          {/* ★変更点: 4つの目盛りをFlexboxで正確に配置 */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between text-xs text-gray-400 px-[7px] -z-10">
            {/* pxで微調整。pointer-events-noneでスライダー操作を妨げないようにする */}
            <span className="w-0 text-center">|</span> {/* 点1 */}
            <span className="w-0 text-center">|</span> {/* 点2 */}
            <span className="w-0 text-center">|</span> {/* 点3 */}
            <span className="w-0 text-center">|</span> {/* 点4 */}
          </div>
          {/* ★変更点: ラベルを両端に配置 */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>落ち着く</span>
            <span>にぎやか</span>
          </div>
        </div>
      </div>

      <div className="relative pt-2">
          <label className="text-sm font-medium">使い方</label>
          {/* ★変更なし: 4段階評価としてこの設定は正しい */}
          <Slider
            value={usage}
            onValueChange={setUsage}
            max={4}
            min={1}
            step={1}
            className="my-4"
          />
          {/* ★変更点: 4つの目盛りをFlexboxで正確に配置 */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between text-xs text-gray-400 px-[7px] -z-10">
            {/* pxで微調整。pointer-events-noneでスライダー操作を妨げないようにする */}
            <span className="w-0 text-center">|</span> {/* 点1 */}
            <span className="w-0 text-center">|</span> {/* 点2 */}
            <span className="w-0 text-center">|</span> {/* 点3 */}
            <span className="w-0 text-center">|</span> {/* 点4 */}
          </div>
          {/* ★変更点: ラベルを両端に配置 */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>普段使い</span>
            <span>特別な日に</span>
          </div>
        </div>
{/* コメント入力欄 */}
                <div>
          <label htmlFor="comment" className="text-sm font-medium">コメント</label>
          <Textarea
            id="comment"
            placeholder="ここにコメントを入力..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-2"
          />
        </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            キャンセル
          </Button>
        </DialogClose>
        <Button type="button" onClick={handleSubmit}>
          追加
        </Button>
      </DialogFooter>
    </>
  );
}