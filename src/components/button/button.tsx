import Image from 'next/image';

interface CustomButtonProps {
  label?: string;
  icon: string;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
}
const CustomShadowButton = ({
  label,
  icon,
  onClick,
  backgroundColor,
  textColor,
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-1 items-center bg-slate-200 border-2 border-black rounded-3xl 
        shadow-[5px_5px_0px_rgba(0,0,0,0.8)] whitespace-nowrap font-bold
        ${label ? 'px-8 py-2' : 'p-2'}
      ${backgroundColor ? `${backgroundColor}` : ''}
      ${textColor ? `${textColor}` : ''}`}
    >
      <Image src={icon} width={20} height={20} alt="아이콘" />
      <div>{label}</div>
    </button>
  );
};

export default CustomShadowButton;
