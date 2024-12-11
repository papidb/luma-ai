import { Loading } from "@/components/loading";
import { usersQueryOptions } from "@/domains/users/hooks";
import { User } from "@/domains/users/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import React from "react";
import { z } from "zod";
import Right from "../assets/icons/arrow-right.svg?react";
import Left from "../assets/icons/arrow-left.svg?react";

const searchParams = z.object({
  pageIndex: z.coerce.number().min(0).max(1000).optional().default(0),
  pageSize: z.coerce.number().min(1).max(1000).optional().default(4),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async (opts) =>
    opts.context.queryClient.ensureQueryData(usersQueryOptions()),
  validateSearch: zodValidator(searchParams),
});

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("full_address", {
    header: "Address",
    cell: (info) => info.getValue(),
  }),
];

function RouteComponent() {
  const dataData = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const pagination = Route.useSearch();

  const setPagination = (newState: Updater<PaginationState>) => {
    navigate({
      to: "/",
      search: newState,
    });
  };

  const dataQuery = useQuery({
    ...usersQueryOptions(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  const defaultData = React.useMemo(() => dataData.data ?? [], [dataData]);

  const table = useReactTable({
    data: dataQuery.data?.data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    pageCount: dataQuery.data?.page_count ?? 1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pageNumbers: (number | string)[] = React.useMemo(() => {
    const page = currentPage + 1;
    const delta = 2; // Number of neighbors around the current page
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        i === page ||
        (i >= page - delta && i <= page + delta) // Pages around the current page
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const onPageChange = (page: number) => {
    if (Number.isNaN(page)) {
      return;
    }
    table.setPageIndex(page);
  };

  const handleRowClick = (user: User) => {
    navigate({
      to: `/users/$id`,
      params: { id: user.id },
      search: {
        name: user.name,
        email: user.email,
      },
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 grid gap-y-6">
      <h1 className="display-xl-medium">Users</h1>
      <div className="rounded-lg border border-grey">
        <table className="w-full text-grey-text">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="[&>th]:border-b-0">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-xs-medium  py-[13px] px-[24px] text-start"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {dataQuery?.isPending ? (
              <tr>
                <td colSpan={3}>
                  <div className="flex items-center justify-center py-20">
                    <div className="flex space-x-2">
                      <Loading />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="[&:not(:last-child)]:border-b hover:bg-gray-50 cursor-pointer  text-start"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`py-[26px] px-[24px] text-[14px] leading-[20px] ${cell.column.id === "name" ? "text-xs-medium" : "text-sm-regular"}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center space-x-2 justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex items-center px-3 py-1 border rounded-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          {/* <span className="text-sm">&larr;</span> */}
          <Left />
          <span className="ml-1">Previous</span>
        </button>
        <ul className="flex space-x-1">
          {pageNumbers.map((number, index) => (
            <li
              onClick={() => onPageChange(Number(number) - 1)}
              key={index}
              className={`flex w-[40px] h-[40px] rounded-lg align-middle items-center justify-center ${
                number === currentPage + 1
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {number === "..." ? (
                <span className="text-grey-text">...</span>
              ) : (
                <button>{number}</button>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="flex items-center px-3 py-1 border rounded-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <span className="mr-1">Next</span>
          {/* <span className="text-sm">&rarr;</span> */}
          <Right />
        </button>
      </div>
    </div>
  );
}
