"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // スクロールイベントを監視し、ボタンの表示/非表示を切り替える
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // 300pxスクロールしたら表示
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // トップへスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // スムーズスクロール
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-lg"
          aria-label="トップに戻る"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
