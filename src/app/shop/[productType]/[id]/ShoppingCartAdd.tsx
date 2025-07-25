"use client";
import Button from "@/components/common/Button";
import Dialog from "@/components/common/SubDialog";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function ShoppingCartAdd() {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    console.log("클릭함");
  };

  return (
    <>
      <Button onClick={handleClick} className="flex justify-center items-center border border-(--color-primary) text-center w-1/4 px-6 py-2 bg-(--color-white)">
        <ShoppingBag />
      </Button>
      <Dialog isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
