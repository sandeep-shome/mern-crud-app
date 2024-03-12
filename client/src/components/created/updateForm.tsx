import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";

interface updateForm {
  setFormState: any;
  name: string;
  email: string;
  post: string;
  salary: number;
  id: string;
}

const UpdateForm: React.FC<updateForm> = ({
  setFormState,
  name,
  email,
  post,
  salary,
  id,
}) => {
  const [updateName, setName] = useState(name);
  const [updateEmail, setEmail] = useState(email);
  const [updatePost, setPost] = useState(post);
  const [updateSalary, setSalary] = useState(salary);
  const { toast } = useToast();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateUser = () => {
    axios
      .put(
        import.meta.env.VITE_SERVER_URL + "update/" + id,
        {
          name: updateName,
          email: updateEmail,
          post: updatePost,
          salary: updateSalary,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        toast({
          description: "Employee data has been updated.",
        });
        setFormState(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        buttonRef.current?.removeAttribute("disabled");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/75 fixed top-0 left-0 z-30">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Update Employees</CardTitle>
          <CardDescription>Update your employe in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your Employee"
                  autoComplete="off"
                  value={updateName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="email of your Employee"
                  autoComplete="off"
                  value={updateEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  placeholder="salary of your project"
                  autoComplete="off"
                  type="number"
                  min={0}
                  value={updateSalary}
                  onChange={(e: any) => setSalary(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="post">Post</Label>
                <Select
                  value={updatePost}
                  onValueChange={(e) => {
                    setPost(e);
                  }}
                >
                  <SelectTrigger id="post">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="jr.Engg.">Junior Engineer</SelectItem>
                    <SelectItem value="sr.Engg">Sinior Engineer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setFormState(false);
            }}
          >
            Cancel
          </Button>
          <Button ref={buttonRef} onClick={updateUser}>
            Update Employe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateForm;
