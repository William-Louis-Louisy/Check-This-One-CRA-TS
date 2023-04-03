import { SearchIcon } from "@heroicons/react/outline";

function SearchInput({
  darkMode,
  searchFunction,
  searchValue,
  setSearchValue,
  placeholder,
  onChange = false,
  displayValue = true,
}: {
  darkMode: boolean;
  searchFunction: any;
  searchValue: string;
  setSearchValue: any;
  placeholder: string;
  onChange?: boolean;
  displayValue?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
      <div className="w-full max-w-lg lg:max-w-xl">
        <label htmlFor="search" className="sr-only">
          {placeholder}
        </label>
        <div className="relative">
          <button
            id="search-button"
            className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
            onClick={() => {
              searchFunction();
            }}
          >
            <SearchIcon className="h-5 w-5 text-myGray" aria-hidden="true" />
          </button>
          <input
            id="search"
            name="search"
            className={`block w-full rounded-md border border-myGray ${
              darkMode
                ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                : "bg-myWhite focus:border-myGray"
            } py-2 pl-10 pr-3 leading-5 placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm`}
            placeholder={placeholder}
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchFunction();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
