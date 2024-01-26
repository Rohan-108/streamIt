import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1>dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
