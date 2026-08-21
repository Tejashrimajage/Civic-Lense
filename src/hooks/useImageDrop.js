import { useMemo, useState } from 'react';

/**
 * Drag-and-drop an image file onto an element. Returns props to spread on the
 * drop target plus whether a drag is currently over it.
 */
export function useImageDrop(onFile) {
  const [isOver, setIsOver] = useState(false);

  const dropProps = useMemo(
    () => ({
      onDragOver: (event) => {
        event.preventDefault();
        setIsOver(true);
      },
      onDragLeave: () => setIsOver(false),
      onDrop: (event) => {
        event.preventDefault();
        setIsOver(false);
        onFile(event.dataTransfer.files?.[0]);
      },
    }),
    [onFile],
  );

  return { dropProps, isOver };
}
