"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { blockUser, UnBlockUser } from "@/lib/block-service";

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch {}
  revalidatePath(`/u/${self.username}/community`);
  return blockUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await UnBlockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};
