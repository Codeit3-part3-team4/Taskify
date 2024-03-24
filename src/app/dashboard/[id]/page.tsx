'use client';
import { ColumnList, getColumnListApi } from '@/api/columnApi';
import AddColumn from '@/components/column/AddColumn';
import Column from '@/components/column/Column';
import { useModal } from '@/components/hooks/useModal/useModal';
import { DashboardContext } from '@/context/DashboardContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function Page({ params: { id } }: { params: { id: number } }) {
  const [columnList, setColumnList] = useState<ColumnList[]>([]);
  const { setDashboardId, data } = useContext(DashboardContext);
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    async function fetchColumnData() {
      try {
        const result = await getColumnListApi(id);
        if (result === null) {
          router.push('/dashboard/mydashboard');
        }
        setColumnList(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchColumnData();
    setDashboardId(Number(id));
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.source || !result.destination) return;
    const { destination, source } = result;
    let items = [...columnList];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setColumnList(items);
  };

  if (!data) {
    return (
      <button className="flex justify-center h-44 items-center">
        <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24" />
      </button>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-dvw mt-24 h-[calc(100dvh-6rem)] overflow-scroll">
      <div className="lg:flex lg:w-full overflow-x-scroll lg:overflow-x-scroll overflow-y-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          {columnList?.map((column: { id: number; title: string }, index: number) => (
            <Droppable key={column.id} droppableId={String(column.id)} direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable draggableId={String(column.id)} index={index} key={column.id}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Column columnId={column.id} columnTitle={column.title} key={column.id} dashboardId={Number(id)} />
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

          <div className="flex items-center lg:items-start w-80 md:w-594 lg:w-96 lg:h-1080 lg:px-4 pt-4">
            <div className="w-80 md:w-594 lg:w-96">
              <div onClick={openModal}>
                <AddColumn dashboardId={Number(id)} />
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
