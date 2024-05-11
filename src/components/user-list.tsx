import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { User } from '../types';
import UserItem from './user-item';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const dummyData: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
  },
];

function UserList() {
  const [users, setUsers] = useState<User[]>(dummyData);

  const handleSortEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setUsers(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={handleSortEnd} modifiers={[restrictToVerticalAxis]}>
      <div className={`w-full p-4 space-y-2`}>
        <div className='text-2xl'>用户列表</div>
        <div
          className={`flex flex-col w-fit p-2 border-2 border-solid border-blue-200 rounded-md space-y-2`}
        >
          <SortableContext items={users} strategy={verticalListSortingStrategy}>
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default UserList;
