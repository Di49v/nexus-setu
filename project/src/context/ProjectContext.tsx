import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  type: 'highway' | 'pipeline' | 'speedbreaker' | 'drainage' | 'utility' | 'other';
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  estimatedCost: number;
  estimatedDuration: number; // in days
  startDate?: string;
  endDate?: string;
  contractor?: string;
  department: string;
  conflicts: string[];
  aiRecommendations: string[];
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProjectsByLocation: (lat: number, lng: number, radius: number) => Project[];
  getConflictingProjects: (projectId: string) => Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'NH-44 Highway Expansion',
    type: 'highway',
    status: 'in-progress',
    priority: 'high',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'NH-44, New Delhi'
    },
    description: 'Expansion of National Highway 44 from 4 to 6 lanes',
    estimatedCost: 50000000,
    estimatedDuration: 365,
    startDate: '2024-01-15',
    contractor: 'ABC Construction Ltd.',
    department: 'National Highways Authority',
    conflicts: ['Underground gas pipeline installation'],
    aiRecommendations: [
      'Coordinate with gas pipeline team to avoid conflicts',
      'Consider phased construction to minimize traffic disruption'
    ],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Underground Gas Pipeline',
    type: 'pipeline',
    status: 'pending',
    priority: 'medium',
    location: {
      lat: 28.6129,
      lng: 77.2095,
      address: 'NH-44, New Delhi'
    },
    description: 'Installation of underground gas pipeline network',
    estimatedCost: 25000000,
    estimatedDuration: 180,
    department: 'Gas Authority of India',
    conflicts: ['Highway expansion project'],
    aiRecommendations: [
      'Schedule after highway expansion completion',
      'Coordinate with highway team for combined excavation'
    ],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Smart Traffic Speed Breakers',
    type: 'speedbreaker',
    status: 'approved',
    priority: 'low',
    location: {
      lat: 28.6149,
      lng: 77.2080,
      address: 'NH-44, New Delhi'
    },
    description: 'Installation of smart speed breakers with LED indicators',
    estimatedCost: 2000000,
    estimatedDuration: 30,
    startDate: '2024-03-01',
    contractor: 'Smart Roads Pvt. Ltd.',
    department: 'Municipal Corporation',
    conflicts: [],
    aiRecommendations: [
      'Install after highway construction is complete',
      'Use solar-powered LED systems for sustainability'
    ],
    createdAt: '2024-01-20'
  }
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const getProjectsByLocation = (lat: number, lng: number, radius: number) => {
    return projects.filter(project => {
      const distance = Math.sqrt(
        Math.pow(project.location.lat - lat, 2) + Math.pow(project.location.lng - lng, 2)
      );
      return distance <= radius;
    });
  };

  const getConflictingProjects = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];

    return projects.filter(p => 
      p.id !== projectId &&
      Math.abs(p.location.lat - project.location.lat) < 0.01 &&
      Math.abs(p.location.lng - project.location.lng) < 0.01
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        getProjectsByLocation,
        getConflictingProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}