import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex h-screen flex-col items-center justify-between bg-not-found bg-cover bg-center bg-no-repeat py-2 opacity-95"
      alt="404">
      <h1 className="text-8xl font-bold text-accent-shade-600">Cupid</h1>
      <Link
        className="rounded-md bg-accent-shade-900 p-2 text-white"
        href="/">
        Go back to the homepage
      </Link>
    </div>
  );
}
