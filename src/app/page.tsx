import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <article className="flex items-center justify-end gap-3 p-4">
        <Link href="/auth/signup">sign up</Link>
        <Link href="/auth/signin">sign in</Link>
      </article>
      <div className="flex justify-center">this is home page</div>
    </main>
  );
}
