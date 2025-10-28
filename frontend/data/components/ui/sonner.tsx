import { Toaster as Sonner, ToasterProps } from "sonner"

interface Props extends ToasterProps {
  themeAlt?: boolean
}

const Toaster = ({ ...props }: Props) => {

  return (
    <Sonner
      {...props}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  )
}

export { Toaster }
