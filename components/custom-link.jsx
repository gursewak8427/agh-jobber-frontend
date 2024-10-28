"use client";
import { useProgressBar } from "@/hooks/use-progress-bar";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function CustomLink({
  children,
  href,
  className,
  onClick,
  ...props
}) {
  const router = useRouter();
  const progress = useProgressBar();

  const navigateToDestination = (e) => {
    e.preventDefault();
    progress.start(); // show the indicator

    startTransition(() => {
      router.push(href);
      progress.done(); // only runs when the destination page is fully loaded
    });
  };

  return (
    <a
      onClick={navigateToDestination}
      className={clsx("hover:cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  );
}
