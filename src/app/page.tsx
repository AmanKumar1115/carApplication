import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  return (
    <div>
      Hello
    </div>
  );
}
