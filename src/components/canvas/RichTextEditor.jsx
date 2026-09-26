import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header', 'bold', 'italic', 'underline',
  'list', 'bullet', 'blockquote', 'code-block', 'link',
];

export function markdownToHtml(text) {
  if (!text) return '';
  if (/<\w/.test(text)) return text;
  let html = text;
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  html = html.split('\n\n').map(block => {
    if (block.match(/^<(h[1-3]|ul|ol)/)) return block;
    return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
  }).join('');
  return html;
}

export default function RichTextEditor({ defaultValue, onChange, onBlur }) {
  return (
    <div className="rich-text-editor" onClick={e => e.stopPropagation()}>
      <ReactQuill
        theme="snow"
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        modules={modules}
        formats={formats}
        placeholder="Write your notes…"
      />
    </div>
  );
}