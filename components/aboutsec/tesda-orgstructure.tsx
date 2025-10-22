import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function TesdaOrgStructure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Image
              src="/orgchart.png"
              alt="TESDA VII Organizational Structure"
              width={800}
              height={600}
              layout="responsive"
              className="cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <Image
              src="/orgchart.png"
              alt="TESDA VII Organizational Structure"
              width={1600}
              height={1200}
              layout="responsive"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
