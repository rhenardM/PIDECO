import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  id,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  id?: string;
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow mb-3 ${tone === "light" ? "text-leaf-300" : "text-forest-700"}`}>{eyebrow}</p>
        )}
        <Tag
          id={id}
          className={`text-3xl font-bold leading-tight md:text-4xl ${tone === "light" ? "text-white" : "text-night-900"}`}
        >
          {title}
        </Tag>
        {intro && (
          <div className={`mt-4 text-lg leading-relaxed ${tone === "light" ? "text-white/75" : "text-muted"}`}>{intro}</div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
