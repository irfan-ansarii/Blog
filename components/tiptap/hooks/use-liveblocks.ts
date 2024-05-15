import { useRoom } from "@/lib/liveblocks.config";
import * as Y from "yjs";

import LiveblocksProvider from "@liveblocks/yjs";
import { useEffect, useState } from "react";

export default function useLiveblocks() {
  const room = useRoom();

  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }
  return {
    doc,
    provider,
  };
}
