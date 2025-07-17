import Image from 'next/image';
import Link from 'next/link';

export default function EventList() {
  const eventList = [
    { id: '1', type: 'event', title: '이벤트 카드1' },
    { id: '2', type: 'event', title: '이벤트 카드2' },
    { id: '3', type: 'event', title: '이벤트 카드3' },
    { id: '4', type: 'event', title: '이벤트 카드4' },
  ];

  return (
    <div className="flex flex-col">
      {eventList.map((post) => (
        <div key={post.id} className="mb-25">
          <Link href={`/community/event/${post.id}`}>
            <Image src={`/images/event/event_${post.id}.png`} width={768} height={500} alt={post.title} />
          </Link>
        </div>
      ))}
    </div>
  );
}
