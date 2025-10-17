
/*const validationMap: Record<string, () => Promise<any>> = {
  'folder1': () => import('./folder1').then(m => m.validateFolder1),
  'folder2': () => import('./folder2').then(m => m.validateFolder2),
  'folder3': () => import('./folder3').then(m => m.validateFolder3),
  'folder4': () => import('./folder4').then(m => m.validateFolder4),
  'folder5': () => import('./folder5').then(m => m.validateFolder5),
  'folder6': () => import('./folder6').then(m => m.validateFolder6),
  'folder7': () => import('./folder7').then(m => m.validateFolder7),
  'folder8': () => import('./folder8').then(m => m.validateFolder8),
  'folder9': () => import('./folder9').then(m => m.validateFolder9),
  'folder10': () => import('./folder10').then(m => m.validateFolder10),
  'folder11': () => import('./folder11').then(m => m.validateFolder11),
};

export const runValidation = async (folderName: string, files: FileList): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> => {
  const validateFunc = validationMap[folderName.toLowerCase()];
  if (validateFunc) {
    const func = await validateFunc();
    return await func(files);
  }
  return [{ folderName, fileName: 'N/A', errorSpotted: 'No validation logic defined' }];
};
*/
import { FolderItem } from '../utils/folderUtils';

const validationMap: Record<string, (files: File[]) => Promise<{ folderName: string; fileName: string; errorSpotted: string }[]>> = {
  '01 test case': (files) => import('./folder1').then(m => m.validateFolder1(files)),
  '02 test case': (files) => import('./folder2').then(m => m.validateFolder2(files)),
  '03 test case': (files) => import('./folder3').then(m => m.validateFolder3(files)),
  '04 test case': (files) => import('./folder4').then(m => m.validateFolder4(files)),
  '05 test case': (files) => import('./folder5').then(m => m.validateFolder5(files)),
  '06 test case': (files) => import('./folder6').then(m => m.validateFolder6(files)),
  '07 test case': (files) => import('./folder7').then(m => m.validateFolder7(files)),
  '08 test case': (files) => import('./folder8').then(m => m.validateFolder8(files)),
  '09 test case': (files) => import('./folder9').then(m => m.validateFolder9(files)),
  '10 test case': (files) => import('./folder10').then(m => m.validateFolder10(files)),
  '11 test case': (files) => import('./folder11').then(m => m.validateFolder11(files)),
};

export const runValidation = async (tree: FolderItem, files: FileList): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> => {
  const results = [];
  if (tree && tree.children) {
    for (const child of tree.children) {
      if (child.type === 'folder' && child.name.toLowerCase().match(/^\d{2}\s+test\s+case$/)) {
        const validateFunc = validationMap[child.name.toLowerCase()];
        if (validateFunc) {
          // Convert FileList to File[] for easier filtering
          const folderFiles = Array.from(files).filter((file: File) => file.webkitRelativePath.startsWith(child.name));
          const folderResults = await validateFunc(folderFiles);
          results.push(...folderResults);
        } else {
          results.push({ folderName: child.name, fileName: 'N/A', errorSpotted: 'No validation logic defined' });
        }
      }
    }
  }
  return results.length > 0 ? results : [{ folderName: 'N/A', fileName: 'N/A', errorSpotted: 'No folders processed' }];
};