import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// {
//     id: 1,
//     title: "Math Exam",
//     duration: 2,
//     deadline: "2025-11-15",
//     published: true,
//     createdAt: "2025-03-10T10:15:30.041Z",
//     createdBy: "benny",
//     status: "pending",
//   }

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("deadline", {
    header: "Deadline",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("published", {
    header: "Published",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor("author.name", {
    header: "Created By",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue() || "Pending",
  }),
  columnHelper.accessor("published", {
    header: "Published",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  columnHelper.accessor("score", {
    header: "Score",
    cell: (info) => (info.getValue() ||"--"),
  }),
  columnHelper.accessor("action", {
    header: "Action",
    cell: () => (
      <div className="flex gap-2">
        <span>Delete</span>
        <span>View</span>
      </div>
    ),
  }),
];

function ExamTable(props) {
  const { exams } = props;

  const table = useReactTable({
    data: exams,
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
