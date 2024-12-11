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
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async (opts) =>
    opts.context.queryClient.ensureQueryData(usersQueryOptions()),
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

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const dataQuery = useQuery({
    ...usersQueryOptions(pagination.pageIndex),
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
    const container: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        container.push(i);
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        !container.includes("...")
      ) {
        container.push("...");
      }
    }
    return container;
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
            {table.getRowModel().rows.map((row) => (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center space-x-2 justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex items-center px-3 py-1 border rounded-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <span className="text-sm">&larr;</span>
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
          <span className="text-sm">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
