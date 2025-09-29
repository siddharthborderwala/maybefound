import LogoMark from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { codeToHtml } from "shiki";

const code = `
const response = fetch(
  \`https://maybefound.com/api/match?url=\${url}\`,
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <your-api-key>"
    },
  }
);

const data = await response.json();
`.trim();

const numberOfLines = code.split("\n").length;
const numDigits = Math.floor(Math.log10(numberOfLines)) + 1;

export default async function Home() {
  const out = await codeToHtml(code, {
    lang: "ts",
    theme: "github-dark-default",
  });

  return (
    <>
      <header className="max-w-7xl mx-auto border border-y-0 p-6 flex items-center justify-between">
        <LogoMark />
        <div className="flex items-center gap-4">
          <Button variant="link" className="h-9.5">
            Docs
          </Button>
          <Button asChild>
            <Link href="/sign-in">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="border-t">
        <section className="px-12 max-w-7xl mx-auto flex items-center justify-between border border-y-0 h-[calc(100dvh-5.25rem)]">
          <div>
            <h1 className="text-5xl max-w-sm">Your 404 page should be smart</h1>
            <p className="text-lg max-w-sm mt-4">
              Help your users find what they&apos;re looking for, with just one
              function call.
            </p>
            <div className="flex gap-4 mt-6 items-center">
              <Button asChild>
                <Link href="/sign-in">Get Started</Link>
              </Button>
              <Button variant="outline" className="h-9.5">
                Read Docs
              </Button>
            </div>
          </div>
          <div className="relative">
            <div>
              <Button variant="secondary">JavaScript</Button>
            </div>
            <div
              className="[&>pre.shiki]:!bg-background border py-6 pr-6 [counter-reset:line] [&_.line]:[counter-increment:line] [&_.line]:before:content-[counter(line)] [&_.line]:before:absolute [&_.line]:before:-left-[calc(var(--line-number-width)+1.25rem)] [&_.line]:before:text-foreground/50 [&_.line]:before:text-right [&_.line]:before:select-none [&_.line]:relative [&_.line]:before:w-[var(--line-number-width)] [&_.line]:before:top-0 [&_.line]:before:[line-height:1.5]"
              style={
                {
                  paddingLeft: `calc(${numDigits}ch + 3rem)`,
                  counterReset: "line",
                  "--line-number-width": `${numDigits}ch`,
                } as React.CSSProperties & { "--line-number-width": string }
              }
              dangerouslySetInnerHTML={{ __html: out }}
            />
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
