'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = {
  value?: string;                 // initial HTML
  onChange: (html: string) => void;
  height?: number;
};

export default function RichEditor({ value = '', onChange, height = 320 }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none p-3 border rounded-xl focus:outline-none min-h-[180px]',
      },
    },
  });

  // make sure external resets propagate
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>', false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="px-2 py-1 border rounded">{'<>'}</button>
        <button type="button" onClick={() => editor.commands.clearContent()} className="px-2 py-1 border rounded">Clear</button>
      </div>
      <div style={{ minHeight: height, height }} className="overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}