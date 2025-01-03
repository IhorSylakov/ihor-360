'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname(); // Получаем текущий путь
  const pathSegments = pathname.split('/').filter((segment) => segment); // Разделяем путь на части

  // Создаем массив для отображения хлебных крошек
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/'); // Генерируем путь для ссылки
    const isLast = index === pathSegments.length - 1; // Проверяем, последняя ли это крошка

    return (
      <span key={href}>
        {!isLast ? (
          <Link href={href}>
            {decodeURIComponent(segment)}
          </Link>
        ) : (
          <span className="text-gray-500">{decodeURIComponent(segment)}</span>
        )}
        {!isLast && ' / '}
      </span>
    );
  });

  return (
    <nav aria-label="Breadcrumbs" className="my-4">
      <div className="text-sm">{breadcrumbs}</div>
    </nav>
  );
};

export default Breadcrumbs;
