"use client";
import React, { useState } from "react";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
    import CategoriesSidebar from "@/modules/home/ui/components/search-filters/categories-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: SearchInputProps) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      {/*    TODO: ADD CATEGORIES VIEW BUTTON*/}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
