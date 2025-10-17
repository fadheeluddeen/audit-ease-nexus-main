/*import * as XLSX from 'xlsx';

type ValidationResult = { folderName: string; fileName: string; errorSpotted: string };

export const validateFolder5 = async (files: FileList): Promise<ValidationResult[]> => {
  const results: ValidationResult[] = [];
  if (files) {
    for (const file of Array.from(files)) {
      try {
        if (file.name.endsWith('.xlsx')) {
          const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown as (string | number | Date | undefined)[][];
          const revDateStr = data?.[2]?.[12]; // Row 3, column 13 (0-based index)
          const revDate = revDateStr ? new Date(revDateStr as string) : null;
          const revMonth = revDate ? revDate.getMonth() + 1 : null;
          let hasError = false;
          if (revMonth !== null) {
            for (let i = 4; i < data.length; i++) {
              const cell = data[i]?.[13];
              if (cell && new Date(cell as string).getMonth() + 1 !== revMonth) {
                hasError = true;
                break;
              }
            }
          } else {
            hasError = true; // Missing revision date
          }
          results.push({ folderName: 'Folder 5', fileName: file.name, errorSpotted: hasError ? 'Month mismatch' : 'No error' });
        } else {
          results.push({ folderName: 'Folder 5', fileName: file.name, errorSpotted: 'Non-Excel file' });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        results.push({ folderName: 'Folder 5', fileName: file.name, errorSpotted: `Error: ${message}` });
      }
    }
  }
  return results;
};*/
import * as XLSX from 'xlsx';

export async function validateFolder5(files: File[]): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> {
  const results = [];
  for (const file of files) {
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
      const revDateStr = data[2][12]; // Row 3, column 13 (0-based index)
      const revDate = new Date(revDateStr);
      const revMonth = revDate.getMonth() + 1;
      let hasError = false;
      for (let i = 4; i < data.length; i++) {
        if (data[i][13] && new Date(data[i][13]).getMonth() + 1 !== revMonth) {
          hasError = true;
          break;
        }
      }
      results.push({ folderName: '05 test case', fileName: file.name, errorSpotted: hasError ? 'Month mismatch' : 'No error' });
    } else {
      results.push({ folderName: '05 test case', fileName: file.name, errorSpotted: 'Non-Excel file' });
    }
  }
  return results.length > 0 ? results : [{ folderName: '05 test case', fileName: 'N/A', errorSpotted: 'No Excel files found' }];
}