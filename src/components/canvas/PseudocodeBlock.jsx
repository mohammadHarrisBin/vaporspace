import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const KEYWORDS = new Set([
  'function', 'def', 'if', 'else', 'elif', 'for', 'foreach', 'while', 'return',
  'break', 'continue', 'const', 'let', 'var', 'class', 'new', 'try', 'catch',
  'finally', 'throw', 'async', 'await', 'import', 'export', 'from', 'default',
  'switch', 'case', 'do', 'until', 'repeat', 'then', 'begin', 'end', 'not',
  'and', 'or', 'null', 'None', 'none', 'true', 'false', 'True', 'False',
  'void', 'int', 'string', 'bool', 'float', 'list', 'array', 'dict', 'set', 'map',
  'in', 'is', 'as', 'with', 'yield', 'raise', 'except', 'pass', 'lambda', 'each',
]);

function tokenize(line) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    // Comment
    if (rest.startsWith('//') || rest.startsWith('#')) {
      tokens.push({ type: 'comment', text: rest });
      break;
    }
    // String
    const strMatch = rest.match(/^(["'`])(?:(?=(\\?))\2.)*?\1/);
    if (strMatch) {
      tokens.push({ type: 'string', text: strMatch[0] });
      i += strMatch[0].length;
      continue;
    }
    // Whitespace
    const wsMatch = rest.match(/^\s+/);
    if (wsMatch) {
      tokens.push({ type: 'ws', text: wsMatch[0] });
      i += wsMatch[0].length;
      continue;
    }
    // Word
    const wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      if (KEYWORDS.has(word)) tokens.push({ type: 'keyword', text: word });
      else if (/^[A-Z]/.test(word)) tokens.push({ type: 'type', text: word });
      else tokens.push({ type: 'word', text: word });
      i += word.length;
      continue;
    }
    // Number
    const numMatch = rest.match(/^\d+(\.\d+)?/);
    if (numMatch) { tokens.push({ type: 'number', text: numMatch[0] }); i += numMatch[0].length; continue; }
    // Delimiters/operators
    const opMatch = rest.match(/^[(){}\[\];:,=+\-*/<>!.&|?@%]+/);
    if (opMatch) { tokens.push({ type: 'op', text: opMatch[0] }); i += opMatch[0].length; continue; }
    tokens.push({ type: 'word', text: rest[0] });
    i++;
  }
  return tokens;
}

const COLORS = {
  keyword: 'text-purple-400 font-medium',
  string: 'text-emerald-400',
  comment: 'text-slate-500 italic',
  number: 'text-orange-400',
  type: 'text-sky-400',
  op: 'text-slate-500',
  word: 'text-slate-300',
  ws: '',
};

export default function PseudocodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const lines = (code || '').split('\n');

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full rounded-md overflow-hidden border border-border bg-[#0d1117] flex flex-col">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">{language || 'pseudocode'}</span>
        </div>
        <button onClick={copy} className="text-muted-foreground/60 hover:text-foreground transition-colors">
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <pre className="text-[11px] leading-[1.6] font-mono">
          {lines.map((line, i) => {
            const tokens = tokenize(line);
            return (
              <div key={i} className="flex hover:bg-white/[0.03]">
                <span className="select-none text-muted-foreground/30 text-right pr-3 pl-3 w-10 shrink-0">{i + 1}</span>
                <code className="whitespace-pre pr-4">
                  {tokens.length === 0 ? '\u00A0' : tokens.map((t, j) => (
                    <span key={j} className={COLORS[t.type] || ''}>{t.text}</span>
                  ))}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}