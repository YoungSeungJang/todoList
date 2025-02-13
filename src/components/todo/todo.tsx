import { getItems } from '@/types/type';
import Image from 'next/image';
import Checklist from '../checklist/checklist';

interface TodoProps {
  items: getItems[];
  toggleCompletion: (id: number) => void;
}

const Todo = ({ items, toggleCompletion }: TodoProps) => {
  return (
    <div className="w-full">
      <Image src="/images/img/todo.svg" width={105} height={105} alt="Todo이미지" />
      <div
        className={`flex flex-col gap-2 my-2 ${
          items.length === 0 ? 'items-center justify-center' : ''
        }`}
      >
        {items.length === 0 ? (
          <div>
            <Image
              src="/images/img/Type=todo, Size=Small.svg"
              width={250}
              height={250}
              alt="Todo이미지"
            />
            <div className="text-slate-400 flex flex-col items-center justify-center">
              <p>할 일이 없어요</p>
              <p>TODO를 새롭게 추가해주세요!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 my-2">
            {items.map((item: getItems) => (
              <Checklist key={item.id} {...item} toggleCompletion={toggleCompletion} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
