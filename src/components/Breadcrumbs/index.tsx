import Link from 'next/link';
import { headers } from 'next/headers';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Crumb {
  label: string | null;
  href: string;
}

// Определяем название сегмента
async function fetchLabel(segment: string, index: number): Promise<string | null> {
  // Если это не первый сегмент, предполагаем, что это данные из Firestore
  const collections = ['countries', 'cities', 'places']; // Пример коллекций
  const collection = collections[index - 1]; // Определяем коллекцию по уровню

  if (!collection) return segment; // Если коллекция не определена, возвращаем сегмент как есть

  const docRef = doc(db, collection, segment);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data().name : segment;
}

export default async function Breadcrumbs() {
  const data = await headers();
  const pathname = data.get('x-pathname') || '/';
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs: Crumb[] = await Promise.all(
    segments.map(async (segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = await fetchLabel(segment, index); // Динамически получаем название сегмента
      return { label, href };
    })
  );

  return (
    <nav aria-label="breadcrumbs">
      <ul style={{ listStyle: 'none', display: 'flex', gap: '8px' }}>
        <li>
          <Link href="/">Главная</Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href}>
            {` > `}
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
