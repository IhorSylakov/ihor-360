'use client';

import AddForm from '@/components/AddForm';
import { useUser } from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import '../index.module.css';

export default function AddPhotoPage() {
  const { user } = useUser();
  const { username } = useParams() as { username: string };

  if (!user?.uid) return <p>Loading...</p>;

  if (user.username !== username) {
    return (
      <>You can not add photo to another user. Please go to your <a href={`/${user.username}/add-photo`}>accaunt page</a> or to <a href={`/${username}`}>main page</a> of this user</>
    )
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1>Добавить фотографию</h1>
        <AddForm />
      </div>
    </div>
  );
}
