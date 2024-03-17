import React from "react"

import { IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DialogDeleteProps {
  nameDelete: string
  onClick: () => void
}

const DialogDelete = ({ nameDelete, onClick }: DialogDeleteProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2" variant={"destructive"}>
          <IconTrash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-s mb-6 text-center font-normal">
            Are you sure you want to delete this {nameDelete}?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-around  gap-[200px]">
          <DialogClose>
            <Button variant={"destructive"} onClick={onClick}>
              Delete
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="default" onClick={onClick}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete
