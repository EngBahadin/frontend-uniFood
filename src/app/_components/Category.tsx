"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function Category() {
    const [open, setOpen] = useState(true)
  return (
    <div>
      <button  onClick={()=>setOpen((prev)=>!prev)} className="flex items-center relative gap-x-2">
        <h2>Category</h2>
        <IoIosArrowDown className="stroke-1 w-6 h-5 " />
      </button>
      {/* {open&&
      <ul className="absolute">
        <Link>All</Link>
        <Link>Local food</Link>
        <Link>Fast food</Link>
        <Link>Sweets</Link>
      </ul>
      } */}
    </div>
  );
}

// const [position, setPosition] = useState("bottom");

//return (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Button>Category</Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-fit ">
//       <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
//         <DropdownMenuRadioItem value="top">All</DropdownMenuRadioItem>
//         <DropdownMenuRadioItem value="bottom">Fast food</DropdownMenuRadioItem>
//         <DropdownMenuRadioItem value="right">Local food</DropdownMenuRadioItem>
//         <DropdownMenuRadioItem value="right">Sweets</DropdownMenuRadioItem>
//       </DropdownMenuRadioGroup>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );
