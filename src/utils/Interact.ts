import { DropTargetMonitor } from "react-dnd/lib/interfaces/monitors";

const dropColor = "darkgreen";
const canDropColor = "darkkhaki";

export function dropColorHandler(monitor: DropTargetMonitor, initial?: any) {
  const isOver = monitor.isOver({ shallow: true }),
    canDrop = monitor.canDrop();
  const isActive = isOver && canDrop;
  let bgColor = initial?.backgroundColor;
  if (isActive) {
    bgColor = dropColor;
    const border = "red 2px dotted";
    return { backgroundColor: bgColor, border };
  } else if (canDrop) {
    bgColor = bgColor ? `${bgColor}88` : canDropColor;
    return { backgroundColor: bgColor };
  }
  return {};
}
