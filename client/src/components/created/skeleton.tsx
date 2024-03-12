import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

const SkeletonTable: React.FC = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-[200px] bg-slate-200" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px] bg-slate-200" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px] bg-slate-200" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px] bg-slate-200" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px] bg-slate-200" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center">
          <Skeleton className="w-7 h-7 rounded-full text-right bg-slate-200 ms-[350px]" />
          <Skeleton className="w-7 h-7 rounded-full text-right bg-slate-200 ms-[25px]" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SkeletonTable;
