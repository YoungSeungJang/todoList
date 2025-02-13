'use client';
import { ItemsApi } from '@/apis/items';
import CustomShadowButton from '@/components/button/button';
import Done from '@/components/done/done';
import Logo from '@/components/logo/logo';
import Todo from '@/components/todo/todo';
import { getItems } from '@/types/type';
import { useEffect, useRef } from 'react';
import useToggleCompletion from './hooks/useToggleCompletion';

export default function Home() {
  const [items, setItems, toggleCompletion] = useToggleCompletion([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await ItemsApi.getItems();
        setItems(res);
      } catch (err) {
        console.error('아이템 가져오기 실패', err);
      }
    };
    fetchItems();
  }, []);

  const todoItems = items.filter((item: getItems) => !item.isCompleted);
  const doneItems = items.filter((item: getItems) => item.isCompleted);

  const handleAddItem = async () => {
    const inputValue = inputRef.current?.value.trim(); // ref로 input 값 접근
    if (!inputValue) return;

    try {
      const newItem = await ItemsApi.postItem(inputValue);
      setItems((prevItems) => [...prevItems, newItem]);
      if (inputRef.current) inputRef.current.value = ''; // input 필드 초기화
    } catch (err) {
      console.error('추가 실패', err);
    }
  };
  return (
    <div className="mx-auto">
      <header className="flex gap-2 flex-col">
        <Logo />
        <div className="flex gap-2 my-4">
          <input
            ref={inputRef}
            className="px-4 border-2 border-black rounded-3xl 
        shadow-[5px_5px_0px_rgba(0,0,0,0.8)] w-full outline-none"
            placeholder="할 일을 입력해 주세요"
          />
          <CustomShadowButton
            label="추가하기"
            icon="/images/ic/Property 1=plus.svg"
            onClick={handleAddItem}
          />
        </div>
      </header>
      <main className="flex flex-col md:flex-row gap-2">
        <Todo items={todoItems} toggleCompletion={toggleCompletion} />
        <Done items={doneItems} toggleCompletion={toggleCompletion} />
      </main>
    </div>
  );
}
