import Link from 'next/link';
// import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      <section>
        <div>home page</div>
        <div>
          <Link href="/dashboard">dashboard</Link>
        </div>
      </section>
    </>
  );
}
