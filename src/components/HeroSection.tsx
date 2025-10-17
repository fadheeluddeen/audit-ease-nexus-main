/*
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { runValidation } from "@/logic/validationDispatcher";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const HeroSection = ({ setSelectedFiles }: { setSelectedFiles?: (files: FileList | null) => void }) => {
  const [folderPath, setFolderPath] = useState("");
  const [selectedFiles, setLocalSelectedFiles] = useState<FileList | null>(null); // Local state for selectedFiles
  const [validationResults, setValidationResults] = useState<{ folderName: string; fileName: string; errorSpotted: string }[]>([]);
  const [validationLoading, setValidationLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseFolder = () => {
    fileInputRef.current?.click();
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const path = (files[0] as any).webkitRelativePath || files[0].name;
      const folderName = path.split('/')[0];
      setFolderPath(folderName);
      setLocalSelectedFiles(files); // Update local state
      setSelectedFiles?.(files); // Pass to App.tsx if handler provided
    }
  };

  const handleRunValidation = async () => {
    if (selectedFiles && selectedFiles.length > 0) {
      setValidationLoading(true);
      const folderName = folderPath.toLowerCase(); // Use the selected folder name
      const results = await runValidation(folderName, selectedFiles);
      setValidationResults(results);
      setValidationLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Easy Audit</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Audit Right. Audit Easy.</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground mb-12">Simplify your folder validation process with smart automation.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="p-8 shadow-soft backdrop-blur-sm bg-card/80">
              <input
                ref={fileInputRef}
                type="file"
                {...{ webkitdirectory: '' } as any} // Type assertion
                directory=""
                multiple
                onChange={handleFolderSelect}
                className="hidden"
              />
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-foreground text-left">Folder Path</label>
                  <div className="flex gap-3">
                    <Input
                      value={folderPath}
                      readOnly
                      placeholder="No folder selected"
                      className="flex-1 bg-background border" // Fixed border-border to border
                    />
                    <Button
                      onClick={handleBrowseFolder}
                      variant="outline"
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <FolderOpen className="w-4 h-4" /> Browse Folder
                    </Button>
                    <Button
                      onClick={handleRunValidation}
                      disabled={!selectedFiles}
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      Run Validation
                    </Button>
                  </div>
                </div>
                {validationResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Validation Results</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Folder Name</TableHead>
                          <TableHead>File Name</TableHead>
                          <TableHead>Error Spotted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {validationResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.folderName}</TableCell>
                            <TableCell>{result.fileName}</TableCell>
                            <TableCell>{result.errorSpotted}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {validationLoading && <p className="text-center">Validating...</p>}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};*/
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { runValidation } from "@/logic/validationDispatcher";
import { processFolder, FolderItem } from "@/utils/folderUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface HeroSectionProps {
  setSelectedFiles: (files: FileList | null) => void;
  setFolderTree: (tree: FolderItem | null) => void;
}

export const HeroSection = ({ setSelectedFiles, setFolderTree }: HeroSectionProps) => {
  const [folderPath, setFolderPath] = useState("");
  const [selectedFiles, setLocalSelectedFiles] = useState<FileList | null>(null);
  const [validationResults, setValidationResults] = useState<{ folderName: string; fileName: string; errorSpotted: string }[]>([]);
  const [validationLoading, setValidationLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseFolder = () => {
    fileInputRef.current?.click();
  };

  const handleFolderSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const path = files[0].webkitRelativePath.split('/')[0] || files[0].name;
      setFolderPath(path);
      setLocalSelectedFiles(files);
      setSelectedFiles(files);
      
      // Build and store folder tree
      const tree = await processFolder();
      setFolderTree(tree);
    }
  };

  const handleRunValidation = async () => {
    if (selectedFiles && selectedFiles.length > 0) {
      setValidationLoading(true);
      const tree = await processFolder();
      if (tree) {
        const results = await runValidation(tree, selectedFiles);
        setValidationResults(results);
      } else {
        setValidationResults([{ folderName: 'N/A', fileName: 'N/A', errorSpotted: 'Folder selection failed' }]);
      }
      setValidationLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Easy Audit</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Audit Right. Audit Easy.</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground mb-12">Simplify your folder validation process with smart automation.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="p-8 shadow-soft backdrop-blur-sm bg-card/80 border-border/50">
              <input
                ref={fileInputRef}
                type="file"
                // @ts-ignore - webkitdirectory is not in the TS types
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFolderSelect}
                className="hidden"
              />
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-foreground text-left">Folder Path</label>
                  <div className="flex gap-3">
                    <Input
                      value={folderPath}
                      readOnly
                      placeholder="No folder selected"
                      className="flex-1 bg-background border-border"
                    />
                    <Button
                      onClick={handleBrowseFolder}
                      variant="outline"
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <FolderOpen className="w-4 h-4" /> Browse Folder
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleRunValidation}
                  disabled={!folderPath}
                  className="w-full gap-2 gradient-primary hover:opacity-90 transition-smooth text-primary-foreground py-6 text-lg font-semibold"
                >
                  Run Validation
                </Button>
                {validationResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Validation Results</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Folder Name</TableHead>
                          <TableHead>File Name</TableHead>
                          <TableHead>Error Spotted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {validationResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.folderName}</TableCell>
                            <TableCell>{result.fileName}</TableCell>
                            <TableCell>{result.errorSpotted}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {validationLoading && <p className="text-center">Validating...</p>}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};