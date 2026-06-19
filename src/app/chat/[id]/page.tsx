import { notFound } from "next/navigation";
import { getConversation } from "@/lib/demo-data";
import { ChatRoom } from "./ChatRoom";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conversation = getConversation(id);
  if (!conversation) notFound();

  return (
    <div className="mx-auto flex h-screen w-full max-w-[480px] flex-col bg-[var(--surface)] shadow-[0_0_60px_rgba(0,0,0,0.05)]">
      <ChatRoom conversation={conversation} />
    </div>
  );
}
