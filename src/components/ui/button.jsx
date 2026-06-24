import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-none border border-pixel-border bg-pixel-surface font-mono text-sm uppercase tracking-normal text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-pixel-cyan disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        brutal: "hover:border-pixel-cyan hover:text-pixel-cyan",
        hype: "border-pixel-magenta text-pixel-magenta hover:bg-pixel-magenta hover:text-white",
        ghost: "bg-transparent hover:border-pixel-cyan",
      },
      size: {
        default: "h-10 px-4",
        logo: "h-12 px-3",
      },
    },
    defaultVariants: {
      variant: "brutal",
      size: "default",
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
