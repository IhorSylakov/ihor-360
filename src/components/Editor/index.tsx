import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
// import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';

interface EditorProps {
  content: string; // Начальное содержимое редактора
  onUpdate: (content: string) => void; // Callback для сохранения изменений
}

const Editor: React.FC<EditorProps> = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      // Underline,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content, // Устанавливаем начальное содержимое
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML()); // Вызываем callback при обновлении содержимого
    },
  });

  return (
    <div>
      {/* <div className="toolbar">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor?.can().toggleBold()}>
          Жирный
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor?.can().toggleItalic()}>
          Курсив
        </button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()} disabled={!editor?.can().toggleUnderline()}>
          Подчеркнутый
        </button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
      </div> */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
