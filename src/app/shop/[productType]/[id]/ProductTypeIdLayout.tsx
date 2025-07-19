'use client';

export default function ProductTypeIdLayout() {
  const tapData = [
    {
      title: 'Overview',
    },
    {
      title: 'Details',
    },
    {
      title: 'Review',
    },
    {
      title: 'Q&A',
    },
  ];

  return (
    <div>
      <nav className="flex justify-between items-center gap-4">
        {tapData.map((itme, index) => {
          return (
            <button
              className="group relative flex-1 p-4 transition-colors delay-100 hover:text-(--color-primary)"
              key={index}
            >
              {itme.title}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-(--color-primary) transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
