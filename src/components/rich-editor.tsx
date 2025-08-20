
'use client';

import React, { useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Heading2, Link as LinkIcon, Code, Eraser } from 'lucide-react';

type Props = {
  initialHtml?: string;
  onChange: (html: string) => void;
  height?: number;
};

const ToolbarButton = ({ onClick, children, isActive }: { onClick: () => void, children: React.ReactNode, isActive?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 border rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
    >
      {children}
    </button>
);


export default function RichEditor({ initialHtml = '', onChange, height = 320 }: Props) {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({ heading: { levels: [2, 3] } }),
        Link.configure({ openOnClick: true, autolink: true }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none focus:outline-none',
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // Ensure external changes propagate to the editor
  React.useEffect(() => {
    if (editor && initialHtml !== editor.getHTML()) {
      editor.commands.setContent(initialHtml || '<p></p>', false);
    }
  }, [initialHtml, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2 border rounded-xl p-2">
      <div className="flex gap-1 flex-wrap border-b pb-2 mb-2">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}><ListOrdered size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}><Code size={16} /></ToolbarButton>
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}><LinkIcon size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.commands.clearContent(true)}><Eraser size={16} /></ToolbarButton>
      </div>
      <div style={{ minHeight: height }} className="p-2 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
