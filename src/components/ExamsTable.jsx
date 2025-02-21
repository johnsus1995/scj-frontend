import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useReducer, useState } from "react";

const defaultData = [
  {
    id: 1,
    title: "Math Exam",
    duration: 2,
    deadline: "2025-11-15",
    published: true,
    createdAt: "2025-03-10T10:15:30.041Z",
    createdBy: "benny",
    status: "pending",
  },
  {
    id: 2,
    title: "Science Exam",
    duration: 1.5,
    deadline: "2025-12-01",
    published: false,
    createdAt: "2025-04-20T11:25:45.041Z",
    createdBy: "bob",
    status: "pass",
  },
  {
    id: 3,
    title: "History Exam",
    duration: 2,
    deadline: "2025-10-25",
    published: true,
    createdAt: "2025-05-15T12:35:50.041Z",
    createdBy: "carol",
    status: "fail",
  },
  {
    id: 4,
    title: "Geography Exam",
    duration: 1,
    deadline: "2025-09-30",
    published: false,
    createdAt: "2025-06-18T13:45:55.041Z",
    createdBy: "dave",
    status: "not started",
  },
  {
    id: 5,
    title: "English Exam",
    duration: 1.5,
    deadline: "2025-08-20",
    published: true,
    createdAt: "2025-07-22T14:55:00.041Z",
    createdBy: "eve",
    status: "pending",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("deadline", {
    header: "Deadline",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("published", {
    header: "Published",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdBy", {
    header: "Created By",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

function ExamTable() {
  const [data, _setData] = useState(() => [...defaultData]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ExamTable;
