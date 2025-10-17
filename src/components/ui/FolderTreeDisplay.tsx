import { FolderItem } from '@/utils/folderUtils';
import { useState } from 'react';

interface FolderTreeProps {
  item: FolderItem;
  depth?: number;
}

export function FolderTreeDisplay({ item, depth = 0 }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === 'file') {
    return (
      <li className={`ml-${depth * 4} text-sm text-gray-700 dark:text-gray-300`}>
        📄 {item.name}
      </li>
    );
  }

  return (
    <li className={`ml-${depth * 4}`}>
      <div
        className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        📁 {item.name}
      </div>
      {item.children && item.children.length > 0 && isOpen && (
        <ul className="ml-4 list-none">
          {item.children.map((child, index) => (
            <FolderTreeDisplay key={index} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}