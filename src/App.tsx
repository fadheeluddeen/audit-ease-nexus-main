import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import { processFolder, FolderItem } from './utils/folderUtils';
import { FolderTreeDisplay } from './components/ui/FolderTreeDisplay';
import { Button } from './components/ui/button';

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderTree, setFolderTree] = useState<FolderItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBrowseFolder = async () => {
    setIsLoading(true);
    const tree = await processFolder();
    setFolderTree(tree);
    if (tree && tree.children && tree.children.length > 0) {
      const input = document.createElement('input') as HTMLInputElement;
      input.type = 'file';
      (input as any).webkitdirectory = '';
      (input as any).directory = '';
      input.multiple = true;
      input.onchange = (e: any) => {
        setSelectedFiles(e.target.files);
        const newTree = processFolder();
        newTree.then(t => setFolderTree(t));
      };
      input.click();
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Index setSelectedFiles={setSelectedFiles} />
          <div className="container mx-auto px-4 py-10 flex-grow">
            <div className="text-center">
              <Button
                onClick={handleBrowseFolder}
                variant="outline"
                className="gap-2 mb-4 hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                Browse Folder for Tree View
              </Button>
              {isLoading && <p className="text-center">Loading...</p>}
              {folderTree && folderTree.children && folderTree.children.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Folder Contents</h3>
                  <ul className="list-none">
                    {folderTree.children.map((child, index) => (
                      <FolderTreeDisplay key={index} item={child} depth={1} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}