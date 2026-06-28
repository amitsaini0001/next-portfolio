"use client";

export function CrtOverlay() {
  return (
    <>
      <div aria-hidden className="crt-scanlines animate-flicker" />
      <div aria-hidden className="crt-vignette" />
    </>
  );
}
