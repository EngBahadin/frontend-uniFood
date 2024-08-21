"use client";
import Link from "next/link";
import { useAuth } from "./_components/hooks/useAuth";

export default function Home() {
  const {
    removeTokens,
    accessToken: isAuthenticated,
    orderNewAccessToken,
  } = useAuth();

  const remove = () => {
    removeTokens();
  };
  const newAccessToken = () => {
    orderNewAccessToken();
  };

  return (
    <main className="">
      <article className="flex items-center justify-end gap-3 p-4">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/signup">sign up</Link>
            <Link href="/auth/signin">sign in</Link>
          </>
        ) : (
          <button onClick={remove}>remove</button>
        )}

        <button onClick={newAccessToken}>newAccessToken</button>
      </article>
      <div className="flex justify-center">this is home page</div>
    </main>
  );
}
