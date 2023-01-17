import Head from "next/head";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
require("dotenv").config()

export default function Home() {
    const { data: session, status } = useSession();
  return (
    <div>
      <Head>
        <title>Auth Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign In</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email}, {session.user.name}, {session.user.image} <br />
            <div>You can now access our super secret pages</div>
            <button>
              <Link href="/secret">To the secret</Link>
            </button>
            <button onClick={signOut}>sign out</button>
          </>
        )}
      </main>
    </div>
  );
}