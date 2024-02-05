"use server";

import { getSelf } from "@/lib/auth-service";
import { Stream } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const stream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });
    if (!stream) {
      throw new Error("Stream not found");
    }
    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };
    const newStream = await db.stream.update({
      where: {
        id: stream.id,
      },
      data: {
        ...validData,
      },
    });
    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
    return newStream;
  } catch {
    throw new Error("Internal Error");
  }
};
