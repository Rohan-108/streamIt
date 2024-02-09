"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isHost,
  isFollowing,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have followed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");
    if (isHost) return;
    if (isFollowing) {
      handleUnFollow();
    } else handleFollow();
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
