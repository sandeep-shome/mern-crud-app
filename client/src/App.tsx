import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";
import Tablerow from "./components/created/tableRow";
import Form from "./components/created/form";
import { useEffect, useState } from "react";
import SkeletonTable from "./components/created/skeleton";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  const [isAddformOpen, setIsAddformOpen] = useState(false);
  const [isLoaded, setIsLoded] = useState(false);
  const [employeData, setEmployeData] = useState([]);

  const getData = () => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "employees")
      .then((res) => {
        setIsLoded(true);
        setEmployeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isAddformOpen]);

  return (
    <>
      <Toaster />
      <div className="w-full h-screen hidden md:flex ">
        {isAddformOpen && <Form setFormState={setIsAddformOpen} />}
        <Table>
          <TableCaption>A list of your Employes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">ID</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px]">Post</TableHead>
              <TableHead className="w-[100px]">Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoaded && (
              <>
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
                <SkeletonTable />
              </>
            )}
            {isLoaded &&
              employeData.map((data: any, index: number) => (
                <Tablerow
                  id={data._id}
                  name={data.name}
                  email={data.email}
                  post={data.post}
                  salary={data.salary}
                  key={index}
                />
              ))}
          </TableBody>
        </Table>
        <Button
          className="md:[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] flex items-center justify-center rounded-full fixed bottom-5 right-5 text-3xl"
          onClick={() => {
            setIsAddformOpen(true);
          }}
        >
          +
        </Button>
      </div>
      <div className="w-full h-screen flex items-center justify-center flex-col md:hidden">
        <span className="material-symbols-outlined text-6xl mb-3 text-slate-600">
          screen_rotation
        </span>
        <p className="text-center max-sm:text-base text-slate-500">
          Sorry, we are currenty not avilable for smaller displays
        </p>
      </div>
    </>
  );
};

export default App;
