'use client';
import { ItemsApi } from '@/apis/items';
import CustomShadowButton from '@/components/button/button';
import Logo from '@/components/logo/logo';
import { getItem } from '@/types/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface ItemPageProps {
  params: {
    id: string;
  };
}

const ItemPage = ({ params: { id } }: ItemPageProps) => {
  const router = useRouter();
  const [item, setItem] = useState<getItem>();
  const [name, setName] = useState<string>();
  const [isCompleted, setIsCompleted] = useState<boolean>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [memo, setMemo] = useState<string>(); // 메모 상태 추가
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await ItemsApi.getItem(id);
        setItem(res);
        setName(res.name);
        setIsCompleted(res.isCompleted);
        setImagePreview(res.imageUrl || null);
        setMemo(res.memo);
      } catch (err) {
        console.error('아이템 정보를 불러오지 못했습니다.', err);
      } finally {
      }
    };
    fetchItem();
  }, []);

  const toggleCompletion = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleUpdateItem = async () => {
    try {
      await ItemsApi.updateItem(id, {
        name,
        isCompleted,
        imageUrl: imagePreview,
        memo,
      });

      alert('아이템이 수정되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('업데이트에 실패했습니다.');
    }
  };

  const handleDeleteItem = async () => {
    try {
      await ItemsApi.deleteItem(id);
      alert('아이템이 삭제되었습니다.');
      router.push('/');
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  return (
    <div>
      <Logo />
      <div className="p-8 min-w-[375px]">
        {/* {item && (
          <Checklist id={item.id} isCompleted={item.isCompleted} name={item.name} key={item.id} />
        )} */}
        {item && (
          <div className="border-2 rounded-3xl">
            <div className="flex gap-2 p-4 items-center justify-center">
              <Image
                className="cursor-pointer"
                src={`${
                  isCompleted
                    ? '/images/ic/Property 1=Frame 2610233.svg'
                    : '/images/ic/Property 1=Default.svg'
                }`}
                width={30}
                height={30}
                onClick={toggleCompletion}
                alt="체크 버튼"
              />
              <input
                className={`${
                  isCompleted ? 'line-through' : ''
                } border-none focus:outline-none underline`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 md:flex-row my-4">
          <div className="relative md:w-1/3 p-2 bg-white border-4 border-dashed h-[300px] max-sm:h-[200px] rounded-xl flex items-center justify-center">
            {imagePreview ? (
              <Image src={imagePreview} layout="fill" objectFit="cover" alt="Uploaded Preview" />
            ) : (
              <Image src="/images/ic/img.svg" width={50} height={50} alt="Upload Placeholder" />
            )}
            <div
              className="bg-slate-200 rounded-full p-3 absolute right-2 bottom-2"
              onClick={handleImageUploadClick}
            >
              <Image
                className="brightness-0"
                src="/images/ic/Property 1=plus.svg"
                width={20}
                height={20}
                alt="업로드 버튼"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="md:w-2/3 p-2 h-[300px] max-sm:h-[200px] relative flex flex-col items-center justify-center">
            <Image
              src="/images/img/memo.svg"
              layout="fill"
              objectFit="cover"
              alt=""
              className="-z-10"
            />
            <div className="z-10 mt-4 font-bold text-amber-800">Memo</div>
            <textarea
              className="z-10 w-5/6 h-2/3 p-2 mt-2 bg-transparent text-amber-800 focus:outline-none resize-none"
              placeholder="메모를 입력하세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end max-sm:justify-center">
          <CustomShadowButton
            label="수정하기"
            icon="/images/ic/check.svg"
            onClick={handleUpdateItem}
          />
          <CustomShadowButton
            label="삭제하기"
            icon="/images/ic/x.svg"
            backgroundColor="bg-rose-500"
            textColor="text-white"
            onClick={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
