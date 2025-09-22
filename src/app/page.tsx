"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShikiHighlighter from "react-shiki";

export default function Home() {
  return (
    <>
      <header className="max-w-7xl mx-auto border border-y-0 p-6">
        <Image
          src="/logo.svg"
          alt="Maybe Found"
          className="w-8 h-8"
          width={40}
          height={40}
        />
      </header>
      <main className="border-t">
        <section className="max-w-7xl mx-auto flex items-center justify-between border border-y-0">
          <div>
            <h1 className="text-5xl max-w-sm">Your 404 page should be smart</h1>
            <p className="text-lg max-w-sm mt-4">
              Help your users find what they&apos;re looking for, with just one
              function call.
            </p>
            <div className="flex gap-4 mt-6 items-center">
              <Button>Get Started</Button>
              <Button variant="outline" className="h-9.5">
                Read Docs
              </Button>
            </div>
          </div>
          <div>
            <ShikiHighlighter
              language="jsx"
              theme="github-dark-default"
              className="[&>pre.shiki]:!bg-background border"
              showLineNumbers={true}
              showLanguage={false}
            >
              {`
const response = fetch(
  \`maybefound.com/api/match?url=\${url}\`,
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <your-api-key>",
    },
  }
);

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
