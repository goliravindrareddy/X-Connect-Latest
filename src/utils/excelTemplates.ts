import { utils, writeFile, read } from 'xlsx';
import type { Region } from '../data/regions';
import { regions } from '../data/regions';
import { countries } from '../data/countries';

export type TemplateType = 'riskMatrix' | 'entityDetails';

interface Template {
  headers: string[];
  validations?: Record<string, string[]>;
  sampleData: any[][];
}

const TEMPLATES: Record<TemplateType, Template> = {
  riskMatrix: {
    headers: [
      'CO Number',
      'Control Objective',
      'Testing Type',
      'CA Number',
      'Control Activity',
      'IT Element',
      'RFI',
      'RAIT',
      'RAWC'
    ],
    validations: {
      'Testing Type': ['ITGC', 'Process'],
      'IT Element': ['Application', 'Operating System', 'Database']
    },
    sampleData: [
      ['CO-01', 'Sample Control Objective', 'ITGC', 'CA1', 'Sample Control Activity', 'Application', 'Sample RFI', 'Higher', 'Higher']
    ]
  },
  entityDetails: {
    headers: [
      'Entity Name',
      'Location',
      'Country',
      'Region',
      'Application Name',
      'Scoped',
      'ITGC Required'
    ],
    validations: {
      'Region': regions,
      'Country': countries.map(c => c.name),
      'Scoped': ['Yes', 'No'],
      'ITGC Required': ['Yes', 'No']
    },
    sampleData: [
      ['Sample Entity', 'New York', 'United States', 'Americas', 'SAP', 'Yes', 'Yes']
    ]
  }
};

export function downloadTemplate(type: TemplateType): void {
  const template = TEMPLATES[type];
  if (!template) throw new Error(`Invalid template type: ${type}`);

  const wb = utils.book_new();
  
  // Create main sheet
  const ws = utils.aoa_to_sheet([
    template.headers,
    ...template.sampleData
  ]);

  // Add validation sheet if needed
  if (template.validations) {
    const validationWs = utils.aoa_to_sheet(
      Object.entries(template.validations).map(([field, values]) => [field, ...values])
    );
    utils.book_append_sheet(wb, validationWs, 'Validations');
  }

  utils.book_append_sheet(wb, ws, 'Template');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${type}_template_${timestamp}.xlsx`;
  
  writeFile(wb, filename);
}

export async function parseExcelData(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}