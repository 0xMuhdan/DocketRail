import React from "react";
import Image from "next/image";

interface LogoProps {
  /**
   * "full" displays the mark + wordmark.
   * "icon" displays only the stylized 'd' track mark.
   */
  type?: "full" | "icon";
  /**
   * "dark" uses white wordmark for dark surfaces (WCAG AAA contrast).
   * "light" uses the original dark forest wordmark for light surfaces.
   */
  variant?: "dark" | "light";
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({
  type = "full",
  variant = "dark",
  height = 28,
  className = "",
  priority = true,
}: LogoProps) {
  if (type === "icon") {
    // Original icon aspect ratio: 446 / 429 ≈ 1.04
    const width = Math.round(height * 1.04);
    const src = variant === "light" ? "/logo-icon-light.png" : "/logo-icon-dark.png";

    return (
      <Image
        src={src}
        alt="DocketRail"
        width={width}
        height={height}
        priority={priority}
        className={`object-contain ${className}`}
      />
    );
  }

  // Full logo aspect ratio: 2172 / 724 = 3.0
  const width = Math.round(height * 3.0);
  const src = variant === "light" ? "/logo-full-light.png" : "/logo-full-dark.png";

  return (
    <Image
      src={src}
      alt="DocketRail"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
