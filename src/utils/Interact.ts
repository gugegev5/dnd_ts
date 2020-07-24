import { DropTargetMonitor } from "react-dnd/lib/interfaces/monitors";

const dropColor = "darkgreen";
const canDropColor = "darkkhaki";

export function dropColorHandler(monitor: DropTargetMonitor, initial?: any) {
  const isOver = monitor.isOver({ shallow: true }),
    canDrop = monitor.canDrop();
  const isActive = isOver && canDrop;
  let bgColor = initial?.backgroundColor,
    border = initial?.border;
  if (isActive) {
    bgColor = dropColor;
    border = "red 2px dotted";
  } else if (canDrop) {
    bgColor = bgColor?`${bgColor}88`:canDropColor;
  }
  return { backgroundColor: bgColor, border };
}
