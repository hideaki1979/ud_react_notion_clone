import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { BlockNoteView } from '@blocknote/mantine';
import { BlockNoteEditor, locales, PartialBlock } from '@blocknote/core';


interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

function Editor({ onChange, initialContent }: EditorProps) {
  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: locales.ja,
    initialContent: initialContent
      ? JSON.parse(initialContent)
      : undefined
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => onChange(JSON.stringify(editor.document))}
      />
    </div>
  );
}

export default Editor;
