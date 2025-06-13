import React, { useState } from 'react';
import { MapPin, Filter, Search, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function MapView() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'on-hold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Map View</h1>
          <p className="text-gray-600">Interactive map showing all infrastructure projects</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Projects</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Placeholder Map - In real implementation, integrate with Google Maps API */}
            <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
              <div className="absolute inset-0 p-6">
                <div className="text-center text-gray-500 mb-6">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Google Maps integration would display here</p>
                </div>
                
                {/* Project Markers */}
                <div className="relative h-full">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        selectedProject === project.id ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${20 + (index * 15) % 60}%`,
                        top: `${30 + (index * 10) % 40}%`
                      }}
                      onClick={() => setSelectedProject(
                        selectedProject === project.id ? null : project.id
                      )}
                    >
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(project.status)} border-2 border-white shadow-lg transition-transform hover:scale-125`}>
                      </div>
                      {project.conflicts.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                      )}
                      
                      {selectedProject === project.id && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-64 z-30">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
                            {getStatusIcon(project.status)}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{project.location.address}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>₹{(project.estimatedCost / 10000000).toFixed(1)}Cr</span>
                            <span>{project.estimatedDuration} days</span>
                          </div>
                          {project.conflicts.length > 0 && (
                            <div className="mt-2 bg-red-50 border border-red-200 rounded p-2">
                              <p className="text-xs text-red-700 font-medium">
                                {project.conflicts.length} conflict(s) detected
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Map Controls */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">In Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">On Hold</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project List Sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          </div>
          <div className="max-h-96 lg:max-h-[500px] overflow-y-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedProject === project.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
                      {getStatusIcon(project.status)}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{project.location.address}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>₹{(project.estimatedCost / 10000000).toFixed(1)}Cr</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        project.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        project.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  {project.conflicts.length > 0 && (
                    <div className="bg-red-100 p-1 rounded-full">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Panel */}
      {selectedProjectData && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedProjectData.title}</h3>
              <p className="text-gray-600">{selectedProjectData.location.address}</p>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Project Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{selectedProjectData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className="font-medium">{selectedProjectData.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{selectedProjectData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">₹{(selectedProjectData.estimatedCost / 10000000).toFixed(1)}Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedProjectData.estimatedDuration} days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedProjectData.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">AI Recommendations</h4>
              <div className="space-y-2">
                {selectedProjectData.aiRecommendations.map((rec, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded p-2">
                    <p className="text-sm text-green-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {selectedProjectData.conflicts.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">Conflicts Detected</h4>
              <div className="space-y-1">
                {selectedProjectData.conflicts.map((conflict, index) => (
                  <p key={index} className="text-sm text-red-700">• {conflict}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}