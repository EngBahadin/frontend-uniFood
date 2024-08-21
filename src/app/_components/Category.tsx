"use client";


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

