"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import clsx from "clsx";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      "peer h-4 w-4 shrink-0 rounded-md border border-ct-text-secondary dark:ring-offset-ct-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ct-text-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=checked]:text-white data-[state=checked]:border-green-600",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={clsx("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4 animate-in slide-in-from-top-2" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
