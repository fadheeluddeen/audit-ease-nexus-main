export interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  path?: string;
}

export const processFolder = async (): Promise<FolderItem | null> => {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
  if (input && input.files) {
    const files = Array.from(input.files);
    if (files.length > 0) {
      const root: FolderItem = { name: 'Root', type: 'folder', children: [] };
      files.forEach(file => {
        const parts = file.webkitRelativePath.split('/');
        let current = root;
        parts.forEach((part, index) => {
          if (index === parts.length - 1) {
            current.children?.push({ name: part, type: 'file', path: file.webkitRelativePath });
          } else {
            let folder = current.children?.find(child => child.name === part && child.type === 'folder');
            if (!folder) {
              folder = { name: part, type: 'folder', children: [] };
              current.children?.push(folder);
            }
            current = folder;
          }
        });
      });
      return root;
    }
  }
  return null;
};