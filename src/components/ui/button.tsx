import { cn } from "@/lib/utils"

export function Button({ children, className, ...props }: any) {
  return (
    <button className={cn("px-4 py-2 bg-blue-500 text-white rounded", className)} {...props}>
      {children}
    </button>
  )
}
