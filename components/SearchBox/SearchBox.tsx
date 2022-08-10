import { FiSearch } from "react-icons/fi";

export const SearchBox = () => {
  return (
    <div className="bg-[#F9F9F9] border border-[#E8E8EA] rounded-lg w-full h-11 flex justify-between items-center gap-x-2 px-2 ">
      <FiSearch className="text-2xl" />
      <input
        className="w-full h-10 bg-transparent outline-none"
        type="text"
        placeholder="Search..."
        name=""
        id=""
      />
      <FiSearch className="text-2xl" />
    </div>
  );
};
