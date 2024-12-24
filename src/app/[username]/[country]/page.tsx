'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
// import Image from 'next/image';
import { useFetchLocation } from '@/hooks/useFetchLocation';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// const preview = 'https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/';

export default function CountryPage() {
  const params = useParams() as { username: string, country: string };
  const [countryId, setCountryId] = useState('');

  useEffect(() => {
    const fetchCountryId = async () => {
      const q = query(
        collection(db, 'countries'),
        where('name', '==', params.country)
      );
      const querySnapshot = await getDocs(q);
      setCountryId(querySnapshot.docs[0].id as string);
    };
    fetchCountryId();
  }, [params.country])

  console.log(countryId)

  const {cities} = useFetchLocation(countryId, '');

  if (!cities) {
    notFound();
  }

  return (
    <div>
      <h1>{params.country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {cities.map((city) => (
          <li key={city.name}>
            <Link href={`/${params.username}/${params.country}/${city?.name}`}>
              {/* <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1', objectFit: 'cover' }}
                alt={`${city.name}`}
                src={city.preview}
              /> */}
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
