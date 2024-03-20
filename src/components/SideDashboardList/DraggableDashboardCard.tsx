import { useRef } from 'react';
import SideDashboardCard from './SideDashboardCard';
import { XYCoord, useDrag, useDrop } from 'react-dnd';

interface DashboardListProps {
  index: number;
  id: number;
  color: string;
  title: string;
  createdByMe: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const ItemTypes = {
  CARD: 'card',
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function DraggableDashboardCard({ index, id, color, title, createdByMe, moveItem }: DashboardListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor) {
      if (!drag) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // 같은 항목 위에 놓지 않도록 조건 추가
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = hoverBoundingRect ? (clientOffset as XYCoord).y - hoverBoundingRect.top : 0;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // 항목 재배치
      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <SideDashboardCard color={color} title={title} createdByMe={createdByMe} />
    </div>
  );
}
