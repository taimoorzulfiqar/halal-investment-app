"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"

interface FallbackImageProps extends React.ComponentProps<typeof Image> {
  fallbackClassName?: string
}

export function FallbackImage({
  src,
  alt,
  fallbackClassName,
  className,
  ...props
}: FallbackImageProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${
          fallbackClassName || className || ""
        }`}
        style={{ width: props.width, height: props.height }}
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <ImageOff className="h-8 w-8 mb-2" />
          <span className="text-sm">No image available</span>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
} 