import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="h-[70vmin] w-[70vmin] flex flex-col gap-4 items-center  justify-center bg-[#00ffff]">
        <h1 className="text-5xl lg:text-6xl">welcome</h1>
        <h2 className="text-l lg:text-xl">to the thePmSquare&apos;s server.</h2>
        <div>nothing much to do here. :/</div>
      </div>

      <Button className=" fixed bottom-4 right-4">send a greeting 👋</Button>
    </main>
  );
}
