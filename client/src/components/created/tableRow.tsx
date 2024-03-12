import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import UpdateForm from "./updateForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

interface TableCell {
  id: string;
  name: string;
  email: string;
  post: string;
  salary: number;
}

const Tablerow: React.FC<TableCell> = ({ id, name, email, post, salary }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { toast } = useToast();

  const deleteEmploye = () => {
    axios
      .delete(import.meta.env.VITE_SERVER_URL + "delete/" + id)
      .then(() => {
        toast({
          description: "Employee data has been deleted.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  return (
    <>
      {isUpdateFormOpen && (
        <UpdateForm
          setFormState={setIsUpdateFormOpen}
          name={name}
          email={email}
          post={post}
          salary={salary}
          id={id}
        />
      )}
      <TableRow key={id}>
        <TableCell className="">{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{post}</TableCell>
        <TableCell>{salary}</TableCell>
        <TableCell className="text-right">
          <span
            className="material-symbols-outlined cursor-pointer text-slate-500 text-center me-6 hover:text-slate-700"
            onClick={() => {
              setIsUpdateFormOpen(true);
            }}
          >
            edit
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span className="material-symbols-outlined cursor-pointer text-slate-500 text-center hover:text-red-500">
                delete
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your employe and remove data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteEmploye}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Tablerow;
