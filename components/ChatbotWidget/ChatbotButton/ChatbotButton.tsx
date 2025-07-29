
import Image from "next/image";

export default function ChatbotButton(props: { setIsOpen: (isOpen: boolean) => void }) {
  const { setIsOpen } = props;
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="bg-green-500 text-white rounded-full p-4 shadow-lg"
    >
      <Image
        src="/assets/icons/chat-icon.svg"
        alt="Chat Icon"
        width={36}
        height={36}
        className="h-8 w-fit"
      />
    </button>
  );
}