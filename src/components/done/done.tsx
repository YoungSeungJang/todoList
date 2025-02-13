import { getItems } from '@/types/type';
import Image from 'next/image';
import Checklist from '../checklist/checklist';

interface DoneProps {
  items: getItems[];
  toggleCompletion: (id: number) => void;
}

const Done = ({ items, toggleCompletion }: DoneProps) => {
  return (
    <div className="w-full">
      <Image src="/images/img/done.svg" width={100} height={100} alt="Done 이미지" />
      <div
        className={`flex flex-col gap-2 my-2 ${
          items.length === 0 ? 'items-center justify-center' : ''
        }`}
      >
        {items.length === 0 ? (
          <div>
            <Image
              src="/images/img/Type=Done, Size=Small.svg"
              width={250}
              height={250}
              alt="Todo이미지"
            />
            <div className="text-slate-400 flex flex-col items-center justify-center">
              <p>아직 다 한 일이 없어요</p>
              <p>해야 할 일을 체크해보세요!</p>
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

export default Done;
