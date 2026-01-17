import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { exportAnimalsCsv, exportAnimalsPdf, generateCsvFromData, formatAnimalDataForExport, ExportParams } from "@/utils/exportUtils";
import { useCleanObject } from "@/hooks/useCleanObject";

interface ExportDropdownProps {
  animals: any[];
  filters?: ExportParams;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  animals,
  filters,
  className = "",
  variant = "outline",
  size = "default"
}) => {
const cleanObject = useCleanObject();

  const handleServerCsvExport = async () => {
    await exportAnimalsCsv(filters);
  };

const handleServerPdfExport = async () => {
  await exportAnimalsPdf(cleanObject(filters || {}));
  console.log("PDF export initiated on server", filters);
};

  const handleClientCsvExport = () => {
    const formattedData = formatAnimalDataForExport(animals);
    generateCsvFromData(formattedData, 'animals_export');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleServerCsvExport}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV (Server)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleServerPdfExport}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF (Server)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClientCsvExport}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV (Client)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 