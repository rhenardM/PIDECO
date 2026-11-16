import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-forest-900 text-white hover:bg-forest-800",
  secondary: "bg-sun-400 text-night-900 hover:bg-sun-500",
  ghost: "text-forest-900 hover:text-forest-700 px-0! underline-offset-4 hover:underline",
  light: "bg-white text-forest-900 hover:bg-paper",
  "outline-light": "border border-white/60 text-white hover:bg-white/10",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-display transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${baseClass} ${variants[variant]} ${extra}`;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function LinkButton({ href, variant = "primary", arrow, children, className = "" }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <ArrowRight className="size-4" />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
