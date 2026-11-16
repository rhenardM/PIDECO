import type { ComponentProps, ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-night-900 shadow-sm transition-colors placeholder:text-muted/70 focus:outline-none focus:ring-2 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20 border-line focus:border-forest-600 focus:ring-forest-600/20";

type Base = { name: string; label: string; required?: boolean; hint?: ReactNode; error?: string };

function Wrapper({ name, label, required, hint, error, children }: Base & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-night-900">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (name: string, hint?: ReactNode, error?: string) =>
  [error ? `${name}-error` : null, hint && !error ? `${name}-hint` : null].filter(Boolean).join(" ") || undefined;

export function TextField({ name, label, required, hint, error, ...rest }: Base & Omit<ComponentProps<"input">, "name">) {
  return (
    <Wrapper {...{ name, label, required, hint, error }}>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, hint, error)}
        className={inputClass}
        {...rest}
      />
    </Wrapper>
  );
}

export function TextArea({ name, label, required, hint, error, ...rest }: Base & Omit<ComponentProps<"textarea">, "name">) {
  return (
    <Wrapper {...{ name, label, required, hint, error }}>
      <textarea
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, hint, error)}
        className={`${inputClass} min-h-40`}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField({
  name,
  label,
  required,
  hint,
  error,
  options,
  placeholder = "Sélectionner…",
  ...rest
}: Base & { options: readonly string[] | { value: string; label: string }[]; placeholder?: string } & Omit<ComponentProps<"select">, "name">) {
  return (
    <Wrapper {...{ name, label, required, hint, error }}>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, hint, error)}
        className={inputClass}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

export function CheckboxGroup({
  name,
  legend,
  options,
  required,
  error,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  required?: boolean;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 text-sm font-semibold text-night-900">
        {legend}
        {required && (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        )}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm has-checked:border-forest-600 has-checked:bg-leaf-100"
          >
            <input type="checkbox" name={name} value={o} className="size-4 accent-forest-700" />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
