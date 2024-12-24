import React from 'react';
import { Plus } from 'lucide-react';
import { BulkUploadButton } from '../common/BulkUploadButton';
import { regions } from '../../data/regions';
import { countries } from '../../data/countries';
import type { EntityDetails } from '../../types/entity';

interface EntityDetailsTableProps {
  entities: EntityDetails[];
  onAdd: (entity: EntityDetails) => void;
  onUpdate: (entity: EntityDetails) => void;
  onDelete: (id: string) => void;
}

const inputStyles = "w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded transition-shadow";
const selectStyles = "w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded transition-shadow bg-transparent";

export function EntityDetailsTable({ entities, onAdd, onUpdate, onDelete }: EntityDetailsTableProps) {
  const handleAddEntity = () => {
    onAdd({
      id: crypto.randomUUID(),
      projectId: entities[0]?.projectId || '',
      serialNumber: entities.length + 1,
      entityName: '',
      location: '',
      country: '',
      region: '',
      applicationName: '',
      isScoped: true,
      itgcRequired: false
    });
  };

  const handleBulkUpload = (data: any[]) => {
    data.forEach((row, index) => {
      onAdd({
        id: crypto.randomUUID(),
        projectId: entities[0]?.projectId || '',
        serialNumber: entities.length + index + 1,
        entityName: row['Entity Name'] || '',
        location: row['Location'] || '',
        country: row['Country'] || '',
        region: row['Region'] || '',
        applicationName: row['Application Name'] || '',
        isScoped: row['Scoped']?.toLowerCase() === 'yes',
        itgcRequired: row['ITGC Required']?.toLowerCase() === 'yes'
      });
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Entities List</h2>
        <div className="flex gap-2">
          <BulkUploadButton
            templateType="entityDetails"
            onUpload={handleBulkUpload}
          />
          <button
            onClick={handleAddEntity}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Entity
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scoped</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITGC Required</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entities.map((entity) => (
              <tr key={entity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entity.serialNumber}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={entity.entityName}
                    onChange={(e) => onUpdate({ ...entity, entityName: e.target.value })}
                    className={inputStyles}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={entity.location}
                    onChange={(e) => onUpdate({ ...entity, location: e.target.value })}
                    className={inputStyles}
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={entity.country}
                    onChange={(e) => onUpdate({ ...entity, country: e.target.value })}
                    className={selectStyles}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={entity.region}
                    onChange={(e) => onUpdate({ ...entity, region: e.target.value })}
                    className={selectStyles}
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={entity.applicationName}
                    onChange={(e) => onUpdate({ ...entity, applicationName: e.target.value })}
                    className={inputStyles}
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={entity.isScoped ? 'yes' : 'no'}
                    onChange={(e) => onUpdate({ ...entity, isScoped: e.target.value === 'yes' })}
                    className={selectStyles}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={entity.itgcRequired ? 'yes' : 'no'}
                    onChange={(e) => onUpdate({ ...entity, itgcRequired: e.target.value === 'yes' })}
                    className={selectStyles}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(entity.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <span className="sr-only">Delete</span>
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}