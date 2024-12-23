'use client';

import { CountryName, media } from '@/data/countryData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
  label: string | null;
  href: string;
}

function findPlaceNameById(data: CountryName[], placeId: string) {
  for (const country of data) {
    for (const city of country.cities) {
      const place = city.places.find((p) => p.id === placeId);
      if (place) {
        return place.name;
      }
    }
  }
  return null;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const filteredSegments = segments.filter((segment) => !segment.startsWith('image-photo'));

  const breadcrumbs: Crumb[] = filteredSegments.map((segment, index) => {
    const href = '/' + filteredSegments.slice(0, index + 1).join('/');
    const label = segment.startsWith('place-') ? findPlaceNameById(media, segment) : decodeURIComponent(segment!);
    return {
      label,
      href,
    };
  });

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
