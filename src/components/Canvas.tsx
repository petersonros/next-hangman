"use client";

import { useEffect, useRef } from "react";

interface CanvasProps {
  wrongCount: number; // 0..6
}

const BASE_W = 510;
const BASE_H = 360;
const ASPECT = BASE_W / BASE_H;

export default function Canvas({ wrongCount }: CanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ro = new ResizeObserver(() => {
      draw();
    });
    ro.observe(wrapper);

    draw();

    return () => {
      ro.disconnect();
    };

    function draw() {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return; // garante que não é null

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const availableW = wrapper.clientWidth;
      const displayW = Math.min(availableW, BASE_W);
      const displayH = Math.round(displayW / ASPECT);

      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      ctx.setTransform(
        (displayW / BASE_W) * dpr,
        0,
        0,
        (displayH / BASE_H) * dpr,
        0,
        0
      );
      ctx.fillStyle = "#252525";
      ctx.fillRect(0, 0, BASE_W, BASE_H);
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(167, 60);
      ctx.lineTo(167, 340);
      ctx.lineTo(115, 355);
      ctx.lineTo(115, 360);
      ctx.lineTo(225, 360);
      ctx.lineTo(225, 355);
      ctx.lineTo(173, 340);
      ctx.lineTo(173, 66);
      ctx.lineTo(334, 66);
      ctx.lineTo(334, 120);
      ctx.lineTo(340, 120);
      ctx.lineTo(340, 60);
      ctx.fill();

      if (wrongCount >= 1) {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(337, 143, 23, 0, Math.PI * 2);
        ctx.fill();
      }
      if (wrongCount >= 2) {
        ctx.beginPath();
        ctx.moveTo(334, 166);
        ctx.lineTo(334, 229);
        ctx.lineTo(340, 229);
        ctx.lineTo(340, 166);
        ctx.fill();
      }
      if (wrongCount >= 3) {
        ctx.beginPath();
        ctx.moveTo(337, 170);
        ctx.lineTo(337, 178);
        ctx.lineTo(310, 205);
        ctx.lineTo(310, 197);
        ctx.fill();
      }
      if (wrongCount >= 4) {
        ctx.beginPath();
        ctx.moveTo(337, 170);
        ctx.lineTo(337, 178);
        ctx.lineTo(364, 205);
        ctx.lineTo(364, 197);
        ctx.fill();
      }
      if (wrongCount >= 5) {
        ctx.beginPath();
        ctx.moveTo(337, 218);
        ctx.lineTo(337, 226);
        ctx.lineTo(310, 253);
        ctx.lineTo(310, 245);
        ctx.fill();
      }
      if (wrongCount >= 6) {
        ctx.beginPath();
        ctx.moveTo(337, 218);
        ctx.lineTo(337, 226);
        ctx.lineTo(364, 253);
        ctx.lineTo(364, 245);
        ctx.fill();
      }
    }
  }, [wrongCount]);

  return (
    <div ref={wrapperRef} className="mx-auto w-full max-w-[510px] px-2">
      <canvas
        ref={canvasRef}
        className="mx-auto block rounded border border-orange-300 shadow"
      />
    </div>
  );
}
