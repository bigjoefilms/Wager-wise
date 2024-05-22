import Image from "next/image";

import { DashboardLayout } from "./components2/Layout";
import Game from "./game1/page";
export default function Home() {
  return (
    <main className="">
      <DashboardLayout>
        <main className="flex items-center justify-center h-[100vh] flex-col">
         <Game/>
        </main>
      </DashboardLayout>
    </main>
  );
}
