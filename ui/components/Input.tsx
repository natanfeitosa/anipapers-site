"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = JSX.IntrinsicElements["input"] & {
  label?: string;
  left?: ReactNode;
  right?: ReactNode;
  wrapperClass?: string;
  labelClass?: string;
};

export default function Input({
  label,
  id: inputId,
  className: inputClass,
  left,
  right,
  wrapperClass,
  labelClass,
  type = "text",
  ...props
}: InputProps) {
  if (label != undefined && inputId == undefined) {
    throw new Error("[ INPUT ]: id expected when using label");
  }

  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputActive = useMemo(() => {
    if (!inputRef.current) return false;
    return inputRef.current.value.length > 0 || inputFocused;
  }, [inputFocused, inputRef]);

  useEffect(() => {
    if (inputRef.current == null) return;

    const onFocus = () => {
      setInputFocused(true);
    };

    const onBlur = () => {
      setInputFocused(false);
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("focus", onFocus);
    inputElement.addEventListener("blur", onBlur);

    return () => {
      if (inputElement == null) return;

      inputElement.removeEventListener("focus", onFocus);
      inputElement.removeEventListener("blur", onBlur);
    };
  }, [inputRef]);

  const classes = useMemo(
    () => ({
      div: twMerge(
        "px-3 py-[0.32rem] relative my-4 w-full rounded border border-neutral-500 dark:border-neutral-400 flex",
        wrapperClass
      ),
      input: twMerge(
        "peer block w-full bg-transparent leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-0 focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 autofill:!bg-black dark:peer-focus:text-primary",
        inputClass
      ),
      label: twMerge(
        "dark:peer-focus:bg-slate-800 dark:peer-data-[input-active]:bg-slate-800 pointer-events-none absolute left-1.5 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] px-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-slate-800 peer-data-[input-active]:-translate-y-[0.9rem] peer-data-[input-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-slate-200 peer-focus:font-bold",
        labelClass
      ),
    }),
    [inputClass, wrapperClass, labelClass]
  );

  return (
    <div className={classes.div}>
      {left && left}
      <input
        className={classes.input}
        id={inputId}
        ref={inputRef}
        type={type}
        data-input-active={inputActive || undefined}
        {...props}
      />
      {label && (
        <label htmlFor={inputId} className={classes.label}>
          {label}
        </label>
      )}
      {right && right}
    </div>
  );
}
