import { usersQueryOptions } from "@/domains/users/hooks";
import { User } from "@/domains/users/types";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const table = useReactTable({
    data: dataData.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });

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
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-medium mb-8">Users</h1>
      <div className="rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-gray-500"
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
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-2 mt-4">
        <button
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4 mr-2 inline" />
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={`px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  table.getState().pagination.pageIndex + 1 === page
                    ? "bg-gray-200 text-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2 inline" />
        </button>
      </div>
    </div>
  );
}
