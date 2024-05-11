import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { User } from '../types';

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`w-fit flex items-center bg-blue-200 p-2 rounded-md`}
    >
      <div className={`w-12`}>{user.id}</div>
      <div className={`w-24`}>{user.name}</div>
      <div className={`w-32 overflow-hidden overflow-ellipsis whitespace-nowrap`}>{user.email}</div>
    </div>
  );
}

export default UserItem;
