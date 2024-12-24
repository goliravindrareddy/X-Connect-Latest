import { utils, writeFile } from 'xlsx';
import type { ITGCRequest } from '../types/itgc-request';

export function exportToExcel(requests: ITGCRequest[], selectedOnly: boolean = false) {
  const data = requests.map(request => ({
    'Application': request.applicationName,
    'CA No': request.caNumber,
    'IT Element': request.itElement,
    'RFI': request.rfi,
    'Due Date': request.dueDate,
    'Client POC': request.clientPOC,
    'Status': request.status,
    'Comments': (request.comments || []).map(c => c.content).join('; '),
    'Attachments': request.attachments.length
  }));

  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'ITGC Requests');
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `itgc_requests_${timestamp}.xlsx`;
  
  writeFile(wb, filename);
}