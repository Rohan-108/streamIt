import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="text-4xl">404 NOT Present Dude</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
