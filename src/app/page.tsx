"use client";

import ShikiHighlighter from "react-shiki";

export default function Home() {
  return (
    <>
      <header></header>
      <main>
        <section className="max-w-6xl mx-auto flex items-center justify-between h-screen">
          <div>
            <h1 className="text-5xl max-w-sm">Your 404 page should be smart</h1>
            <p className="text-lg max-w-sm mt-4">
              Help your users find what they&apos;re looking for, with just one
              function call.
            </p>
          </div>
          <div>
            <ShikiHighlighter language="jsx" theme="github-dark-default">
              {`
const response = fetch("maybefound.com/api/match", {
  method: "POST",
  body: JSON.stringify({
    url: request.url,
  }),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <your-api-key>",
  },
});

const data = await response.json();
            `.trim()}
            </ShikiHighlighter>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
