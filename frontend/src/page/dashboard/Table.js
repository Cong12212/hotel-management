import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

// Component Table
const Table = ({ data }) => {
  // Định nghĩa cột bảng
  const columns = [
    {
      header: "NAME",
      accessorKey: "name",
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    },
    {
      header: "ROOM TYPE",
      accessorKey: "roomType",
    },
    {
      header: "CHECK IN",
      accessorKey: "checkIn",
    },
    {
      header: "CHECK OUT",
      accessorKey: "checkOut",
    },
    {
      header: "PAID AMOUNT",
      accessorKey: "paidAmount",
      cell: (info) => (
        <span>{info.getValue() > 0 ? `$${info.getValue()}` : "0.00"}</span>
      ),
    },
    {
      header: "DUE AMOUNT",
      accessorKey: "dueAmount",
      cell: (info) => <span>${info.getValue()}</span>,
    },
    {
      header: "PAYMENT STATUS",
      accessorKey: "status",
      cell: (info) => {
        const status = info.getValue();
        const color =
          status === "Success"
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800";
        return (
          <span
            className={`px-3 py-1 text-sm font-medium rounded ${color}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  // Tạo bảng với useReactTable
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      {/* Hiển thị bảng */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {
                      // Thêm mũi tên hiển thị trạng thái sắp xếp
                      {
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted()] ?? null
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
