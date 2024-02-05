import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) throw new Error("User not found");
    if (otherUser.id === self.id) return false;

    const blocked = await db.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockedId: self.id,
      },
    });
    return !!blocked;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) throw new Error("Cant Block self");
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) throw new Error("User not found");
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (existingBlock) {
    throw new Error("Already blocked");
  }
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};
export const UnBlockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) throw new Error("Cant UnBlock self");
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) throw new Error("User not found");
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!existingBlock) {
    throw new Error("Not blocked");
  }
  const UnBlock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
  return UnBlock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
