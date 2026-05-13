import { SearchBar } from "@/components/forms/SearchBar";
import { ProviderButton } from "@/components/ProviderButton";
import { FilterChips } from "@/components/FilterChips";

export const SearchAndFilters = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4">
      <div className="box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
        <div className="box-border caret-transparent basis-6/12 grow min-h-[auto] min-w-[auto] outline-[3px] md:basis-auto">
          <SearchBar />
        </div>
        <ProviderButton />
      </div>
      <FilterChips />
    </div>
  );
};
