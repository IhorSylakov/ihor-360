'use client';

import AddForm from '@/components/AddForm';
import { useUser } from '@/context/UserContext';
import { useParams } from 'next/navigation';

export default function AddPhotoPage() {
  const { state } = useUser();
  const { username } = useParams() as { username: string };

  if (!state.uid) return <p>Loading...</p>;

  if (state.username !== username) {
    return (
      <>You can not add photo to another user. Please go to your <a href={`/${state.username}/add-photo`}>accaunt page</a> or to <a href={`/${username}`}>main page</a> of this user</>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Добавить фотографию</h1>
      <AddForm authorId={state.uid} />
    </div>
  );
}
