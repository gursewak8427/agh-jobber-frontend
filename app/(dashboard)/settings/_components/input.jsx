import clsx from "clsx";
import * as React from "react";


const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        "flex h-10 w-full rounded-md border border-ct-text-secondary bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-ct-text-secondary focus-visible:outline-none dark:ring-offset-ct-secondary focus-visible:ring-2 focus-visible:ring-ct-text-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
