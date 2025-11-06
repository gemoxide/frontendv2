import React, { useRef, useEffect, useState, useCallback } from "react";
import SignaturePadLib from "signature_pad";
import classNames from "classnames";
import Button from "../Button";

interface SignaturePadProps {
  className?: string;
  onClear?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSaveImage?: (dataUrl: string) => void;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  className = "",
  onClear,
  onUndo,
  onRedo,
  onSaveImage,
  width = 1000,
  height = 400,
  penColor = "black",
  backgroundColor = "rgba(0,0,0,0)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const signaturePadRef = useRef<SignaturePadLib | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const signaturePad = new SignaturePadLib(canvas, {
      backgroundColor,
      penColor,
      minWidth: 2,
      maxWidth: 6,
    });

    signaturePadRef.current = signaturePad;

    const resizeCanvas = () => {
      if (!container || !canvas) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width || width;
      const containerHeight = containerRect.height || height;

      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const currentData = signaturePad.isEmpty()
        ? null
        : signaturePad.toDataURL();

      canvas.width = containerWidth * ratio;
      canvas.height = containerHeight * ratio;
      canvas.getContext("2d")?.scale(ratio, ratio);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      if (currentData) {
        signaturePad.fromDataURL(currentData);
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);

    const handleBeginStroke = () => {
      const currentData = signaturePad.toDataURL();
      setUndoStack((prev) => {
        const newStack = [...prev, currentData];
        setCanUndo(newStack.length > 0);
        return newStack;
      });
      setRedoStack([]);
      setCanRedo(false);
    };

    const handleEndStroke = () => {
      setIsEmpty(signaturePad.isEmpty());
    };

    signaturePad.addEventListener("beginStroke", handleBeginStroke);
    signaturePad.addEventListener("endStroke", handleEndStroke);

    return () => {
      signaturePad.removeEventListener("beginStroke", handleBeginStroke);
      signaturePad.removeEventListener("endStroke", handleEndStroke);
      resizeObserver.disconnect();
      signaturePad.off();
    };
  }, [backgroundColor, penColor, width, height]);

  useEffect(() => {
    if (signaturePadRef.current) {
      signaturePadRef.current.penColor = penColor;
      signaturePadRef.current.backgroundColor = backgroundColor;
    }
  }, [penColor, backgroundColor]);

  const handleClear = useCallback(() => {
    if (signaturePadRef.current) {
      if (!signaturePadRef.current.isEmpty()) {
        const currentData = signaturePadRef.current.toDataURL();
        setUndoStack((prev) => [...prev, currentData]);
        setCanUndo(true);
      }
      signaturePadRef.current.clear();
      setIsEmpty(true);
      setRedoStack([]);
      setCanRedo(false);
      onClear?.();
    }
  }, [onClear]);

  const handleUndo = useCallback(() => {
    if (signaturePadRef.current && undoStack.length > 0) {
      const currentData = signaturePadRef.current.toDataURL();
      setRedoStack((prev) => [...prev, currentData]);

      const previousData = undoStack[undoStack.length - 1];
      const newUndoStack = undoStack.slice(0, -1);
      setUndoStack(newUndoStack);

      signaturePadRef.current.fromDataURL(previousData);
      setIsEmpty(signaturePadRef.current.isEmpty());
      setCanUndo(newUndoStack.length > 0);
      setCanRedo(true);
      onUndo?.();
    }
  }, [undoStack, onUndo]);

  const handleRedo = useCallback(() => {
    if (signaturePadRef.current && redoStack.length > 0) {
      const currentData = signaturePadRef.current.toDataURL();
      setUndoStack((prev) => [...prev, currentData]);

      const nextData = redoStack[redoStack.length - 1];
      const newRedoStack = redoStack.slice(0, -1);
      setRedoStack(newRedoStack);

      signaturePadRef.current.fromDataURL(nextData);
      setIsEmpty(signaturePadRef.current.isEmpty());
      setCanUndo(true);
      setCanRedo(newRedoStack.length > 0);
      onRedo?.();
    }
  }, [redoStack, onRedo]);

  const handleSaveImage = useCallback(() => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onSaveImage?.(dataUrl);
    }
  }, [onSaveImage]);

  const containerClassName = classNames("signature-pad-container", className);

  return (
    <div className={containerClassName}>
      <div
        ref={containerRef}
        className="border border-gray-300 rounded-lg overflow-hidden bg-white"
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "400px",
        }}
      >
        <canvas
          ref={canvasRef}
          className="touch-none"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          label="Clear"
          onClick={isEmpty ? undefined : handleClear}
          variant="default"
          className={`capitalize ${
            isEmpty ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <Button
          label="Undo"
          onClick={!canUndo ? undefined : handleUndo}
          variant="secondary"
          className={`capitalize ${
            !canUndo ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <Button
          label="Redo"
          onClick={!canRedo ? undefined : handleRedo}
          variant="secondary"
          className={`capitalize ${
            !canRedo ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <Button
          label="Save Image"
          onClick={isEmpty ? undefined : handleSaveImage}
          variant="primary"
          className={`capitalize ${
            isEmpty ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default SignaturePad;
