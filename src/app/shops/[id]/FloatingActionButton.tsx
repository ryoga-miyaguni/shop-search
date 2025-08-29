"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ReviewForm from "./ReviewForm";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg">
          <Plus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <ReviewForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}