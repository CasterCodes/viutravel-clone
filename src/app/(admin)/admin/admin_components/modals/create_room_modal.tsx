import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewRoomForm } from "../forms/new_room_form";
import { Plus } from "lucide-react";

const CreateRoomModal = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-red-600 flex flex-row items-center hover:bg-red-600">
          <Plus size={16} />
          Create
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[40vw] overflow-auto bg-slate-100">
        <SheetHeader>
          <SheetTitle className="text-3xl ">Create room</SheetTitle>
        </SheetHeader>
        <NewRoomForm />
      </SheetContent>
    </Sheet>
  );
};

export default CreateRoomModal;
