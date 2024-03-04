import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewRoomForm } from "../forms/new_room_form";

const CreateRoomModal = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create</Button>
      </SheetTrigger>
      <SheetContent className="min-w-[40vw] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-3xl">Create room</SheetTitle>
        </SheetHeader>
        <NewRoomForm />
      </SheetContent>
    </Sheet>
  );
};

export default CreateRoomModal;
