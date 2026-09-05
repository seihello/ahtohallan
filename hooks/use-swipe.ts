"use client";

import React, { useRef } from "react";

const MIN_DISTANCE = 60;
const MAX_VERTICAL_RATIO = 0.6;

type Options = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function useSwipe({ onSwipeLeft, onSwipeRight }: Options) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) {
      startRef.current = null;
      return;
    }

    const touch = event.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const start = startRef.current;
    startRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - start.x;
    const distanceY = touch.clientY - start.y;

    if (Math.abs(distanceX) < MIN_DISTANCE) return;
    if (Math.abs(distanceY) > Math.abs(distanceX) * MAX_VERTICAL_RATIO) return;

    if (event.cancelable) event.preventDefault();

    if (distanceX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchEnd };
}
