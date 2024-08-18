import { CiSearch } from "react-icons/ci";
function SearchBar() {
  return (
    <div className="relative overflow-hidden flex items-center">
      <CiSearch className="w-6 h-6 ml-2 absolute" />
      <input
        className="pl-9 rounded-[10px] placeholder:gray-100 md:w-[240px] w-0 lg:w-[362px] h-10 text-text-3-medium outline-none bg-white shrink"
        type="text"
        placeholder="What are you looking for?"
      />
    </div>
  );
}

export default SearchBar;
