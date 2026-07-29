import { useEffect, useState } from 'react';

type ToastKind = 'success' | 'error';
interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

let items: ToastItem[] = [];
let listeners: Array<(items: ToastItem[]) => void> = [];
let counter = 0;

function emit() {
  listeners.forEach((listener) => listener(items));
}

export function toast(message: string, kind: ToastKind = 'success') {
  const id = ++counter;
  items = [...items, { id, kind, message }];
  emit();
  setTimeout(() => {
    items = items.filter((item) => item.id !== id);
    emit();
  }, 3500);
}

export default function ToastHost() {
  const [list, setList] = useState<ToastItem[]>(items);

  useEffect(() => {
    listeners.push(setList);
    return () => {
      listeners = listeners.filter((listener) => listener !== setList);
    };
  }, []);

  return (
    <div className="toast-stack">
      {list.map((item) => (
        <div key={item.id} className={`toast toast-${item.kind}`}>
          {item.message}
        </div>
      ))}
    </div>
  );
}
