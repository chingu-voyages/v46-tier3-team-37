'use client';

import Button from '../uiComponents/Button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()}>BACK</Button>
  );
}
