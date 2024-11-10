import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      welcome to the thePmSquare's server.
      <Button>send a greeting</Button>
    </div>
  );
}
