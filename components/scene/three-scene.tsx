"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("./scene-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-terminal-dim text-xs">
      <span className="term-cursor">loading scene</span>
    </div>
  ),
});

type Props = {
  pin?: { lat: number; lng: number; label?: string } | null;
};

export function ThreeScene({ pin }: Props) {
  return (
    <div className="relative h-full w-full">
      <SceneCanvas pin={pin} />
    </div>
  );
}
