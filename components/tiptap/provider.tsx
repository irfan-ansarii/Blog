"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/lib/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "@/components/loading";

export default function LiveblocksProvider({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
