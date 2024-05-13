"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { FormField } from "@/components/ui/form";

async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}

export default function Editor({ form }: { form: any }) {
  const editor = useCreateBlockNote({
    uploadFile,
  });

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <BlockNoteView
          editor={editor}
          theme="light"
          onChange={() => {
            field.onChange(editor.document);
          }}
        />
      )}
    />
  );
}
