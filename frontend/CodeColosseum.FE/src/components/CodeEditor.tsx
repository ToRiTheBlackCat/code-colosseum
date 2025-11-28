interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="h-full bg-[#1e1e1e] p-4 font-mono text-sm overflow-auto">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent text-gray-100 resize-none outline-none"
        spellCheck={false}
        style={{
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          tabSize: 4,
        }}
      />
    </div>
  );
}
