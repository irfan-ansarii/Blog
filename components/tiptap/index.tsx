"use client";

import React from "react";

import useLiveblocks from "./hooks/use-liveblocks";
import Content from "./content";

export const TiptapEditor = () => {
  const collab = useLiveblocks();

  if (!collab) return;

  const { doc, provider } = collab;
  return <Content doc={doc} provider={provider} />;
};

export default TiptapEditor;
