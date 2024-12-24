import React from 'react';
import { Save } from 'lucide-react';
import { EntityDetailsTable } from './EntityDetailsTable';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { EntityDetails } from '../../types/entity';
import type { ProjectScope } from '../../types/project';

export function EntityDetailsPage() {
  const [entities, setEntities] = useLocalStorage<EntityDetails[]>('entities', []);
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectEntities = entities.filter(e => e.projectId === selectedProjectId);

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project to manage entities
        </h2>
      </div>
    );
  }

  const addEntity = () => {
    const newEntity: EntityDetails = {
      id: crypto.randomUUID(),
      projectId: selectedProjectId!,
      serialNumber: projectEntities.length + 1,
      entityName: '',
      location: '',
      country: '',
      applicationName: '',
      isScoped: true,
      itgcRequired: false
    };
    setEntities([...entities, newEntity]);
  };

  const updateEntity = (updatedEntity: EntityDetails) => {
    setEntities(entities.map(entity => 
      entity.id === updatedEntity.id ? updatedEntity : entity
    ));
  };

  const deleteEntity = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  const handleSave = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Changes saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entity Details</h1>
          <p className="text-gray-600 mt-1">
            Managing entities for {selectedProject.groupName}
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
      
      <EntityDetailsTable
        entities={projectEntities}
        onAdd={addEntity}
        onUpdate={updateEntity}
        onDelete={deleteEntity}
      />
    </div>
  );
}