'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ChecklistProps {
  name: string;
  isCompleted: boolean;
  id: number;
  toggleCompletion: (id: number) => void;
}

const Checklist = ({ id, name, isCompleted, toggleCompletion }: ChecklistProps) => {
  const pathname = usePathname();
  const isItemPage = pathname.startsWith('/items');

  return (
    <Link
      href={`/items/${id}`}
      className={`flex gap-2 ${
        isCompleted ? 'bg-violet-100' : 'bg-slate-100'
      } items-center rounded-3xl border-black border-2 p-2 cursor-pointer" ${
        isItemPage ? 'justify-center' : ''
      }`}
    >
      <Image
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          toggleCompletion(id);
        }}
        src={`${
          isCompleted
            ? '/images/ic/Property 1=Frame 2610233.svg'
            : '/images/ic/Property 1=Default.svg'
        }`}
        width={30}
        height={30}
        alt="체크박스"
      />
      <div className={`${isCompleted ? 'line-through' : ''}`}>{name}</div>
    </Link>
  );
};

export default Checklist;
