import { useState, useRef, useEffect } from "react";
import {
  Pencil,
  Eraser,
  Square,
  Circle,
  Type,
  Trash2,
  Download,
  Undo,
  Redo,
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  type: "line" | "rectangle" | "circle" | "text";
  points?: Point[];
  start?: Point;
  end?: Point;
  text?: string;
  color: string;
  userId: string;
}

interface CollaborativeWhiteboardProps {
  participants: Array<{ id: string; username: string; color: string }>;
}

export function CollaborativeWhiteboard({
  participants,
}: CollaborativeWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<
    "pen" | "eraser" | "rectangle" | "circle" | "text"
  >("pen");
  const [color, setColor] = useState("#8b5cf6");
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(
    null
  );
  const [remoteCursors, setRemoteCursors] = useState<
    Array<{
      userId: string;
      username: string;
      x: number;
      y: number;
      color: string;
    }>
  >([]);

  const colors = [
    "#8b5cf6",
    "#ec4899",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ffffff",
    "#000000",
  ];

  // Simulate remote cursors
  useEffect(() => {
    const interval = setInterval(() => {
      if (participants.length > 1) {
        const randomParticipant =
          participants[Math.floor(Math.random() * participants.length)];
        const canvas = canvasRef.current;
        if (canvas) {
          setRemoteCursors([
            {
              userId: randomParticipant.id,
              username: randomParticipant.username,
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              color: randomParticipant.color,
            },
          ]);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [participants]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw all elements
    elements.forEach((element) => {
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (element.type === "line" && element.points) {
        ctx.beginPath();
        element.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      } else if (element.type === "rectangle" && element.start && element.end) {
        ctx.strokeRect(
          element.start.x,
          element.start.y,
          element.end.x - element.start.x,
          element.end.y - element.start.y
        );
      } else if (element.type === "circle" && element.start && element.end) {
        const radius = Math.sqrt(
          Math.pow(element.end.x - element.start.x, 2) +
            Math.pow(element.end.y - element.start.y, 2)
        );
        ctx.beginPath();
        ctx.arc(element.start.x, element.start.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (element.type === "text" && element.start && element.text) {
        ctx.font = "16px Monaco, monospace";
        ctx.fillText(element.text, element.start.x, element.start.y);
      }
    });

    // Draw current element being created
    if (currentElement) {
      ctx.strokeStyle = currentElement.color;
      ctx.fillStyle = currentElement.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (currentElement.type === "line" && currentElement.points) {
        ctx.beginPath();
        currentElement.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      } else if (
        currentElement.type === "rectangle" &&
        currentElement.start &&
        currentElement.end
      ) {
        ctx.strokeRect(
          currentElement.start.x,
          currentElement.start.y,
          currentElement.end.x - currentElement.start.x,
          currentElement.end.y - currentElement.start.y
        );
      } else if (
        currentElement.type === "circle" &&
        currentElement.start &&
        currentElement.end
      ) {
        const radius = Math.sqrt(
          Math.pow(currentElement.end.x - currentElement.start.x, 2) +
            Math.pow(currentElement.end.y - currentElement.start.y, 2)
        );
        ctx.beginPath();
        ctx.arc(
          currentElement.start.x,
          currentElement.start.y,
          radius,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    }
  }, [elements, currentElement]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getCoordinates(e);

    if (tool === "pen" || tool === "eraser") {
      setCurrentElement({
        type: "line",
        points: [point],
        color: tool === "eraser" ? "#1e1e1e" : color,
        userId: "local",
      });
    } else if (tool === "rectangle" || tool === "circle") {
      setCurrentElement({
        type: tool,
        start: point,
        end: point,
        color,
        userId: "local",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement) return;

    const point = getCoordinates(e);

    if (tool === "pen" || tool === "eraser") {
      setCurrentElement({
        ...currentElement,
        points: [...(currentElement.points || []), point],
      });
    } else if (tool === "rectangle" || tool === "circle") {
      setCurrentElement({
        ...currentElement,
        end: point,
      });
    }
  };

  const handleMouseUp = () => {
    if (currentElement) {
      setElements([...elements, currentElement]);
      setCurrentElement(null);
    }
    setIsDrawing(false);
  };

  const handleClear = () => {
    setElements([]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = url;
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="border-b border-gray-800 px-4 py-3 bg-[#252525] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTool("pen")}
            className={`p-2 rounded-lg transition-all ${
              tool === "pen"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            title="Pen"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`p-2 rounded-lg transition-all ${
              tool === "eraser"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            title="Eraser"
          >
            <Eraser className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool("rectangle")}
            className={`p-2 rounded-lg transition-all ${
              tool === "rectangle"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            title="Rectangle"
          >
            <Square className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool("circle")}
            className={`p-2 rounded-lg transition-all ${
              tool === "circle"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            title="Circle"
          >
            <Circle className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-2" />

          <div className="flex gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-lg transition-all ${
                  color === c
                    ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#252525]"
                    : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {participants.length > 1 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400 mr-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>{participants.length} drawing</span>
            </div>
          )}
          <button
            onClick={() => setElements(elements.slice(0, -1))}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            title="Undo"
            disabled={elements.length === 0}
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            title="Clear All"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* Remote cursors */}
        {remoteCursors.map((cursor) => (
          <div
            key={cursor.userId}
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M0 0 L0 16 L4 12 L7 18 L9 17 L6 11 L12 10 Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
            <div
              className="absolute top-5 left-5 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
