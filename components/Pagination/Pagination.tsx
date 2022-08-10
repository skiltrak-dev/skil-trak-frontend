import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export const Pagination = ({ data, itemsPerPage, setCurrentItems }: any) => {
	// We start with an empty list of items.
	const [pageCount, setPageCount] = useState(0);

	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	const [initialPage, setInitialPage] = useState(0);

	useEffect(() => {
		// setPageCount(Math.ceil(data.length / itemsPerPage));
		setItemOffset(0);
		setInitialPage(0);
	}, [data, itemsPerPage]);

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(data.slice(itemOffset, endOffset));

		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [data, itemOffset, itemsPerPage, setCurrentItems]);

	const onPaginationClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
		setInitialPage(event.selected);
	};

	return (
		<>
			<div className="max-w-1280">
				<ReactPaginate
					breakLabel="..."
					pageCount={pageCount}
					selectedPageRel={null}
					pageRangeDisplayed={1}
					forcePage={initialPage}
					marginPagesDisplayed={2}
					nextClassName="text-black"
					// renderOnZeroPageCount={null}
					prevRel={null}
					nextRel={null}
					previousClassName="text-black"
					onPageChange={onPaginationClick}
					nextLabel={<MdKeyboardArrowRight className="text-lg" />}
					previousLabel={<MdKeyboardArrowLeft className="text-lg" />}
					activeClassName="text-black text-center leading-8 rounded-full  "
					containerClassName={` h-8 text-xs text-gray-light flex justify-end items-center gap-x-2 font-bold`}
				/>
			</div>
		</>
	);
};
