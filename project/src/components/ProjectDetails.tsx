import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  User,
  Building
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, getConflictingProjects } = useProjects();
  
  const project = projects.find(p => p.id === id);
  const conflictingProjects = project ? getConflictingProjects(project.id) : [];

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600 mb-4">The requested project could not be found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      'on-hold': 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[priority as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600">{project.location.address}</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(project.status)}`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityBadge(project.priority)}`}>
            {project.priority.toUpperCase()} PRIORITY
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
            {project.type.replace('-', ' ').toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Cost</p>
                  <p className="font-semibold text-gray-900">₹{(project.estimatedCost / 10000000).toFixed(1)} Crores</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Duration</p>
                  <p className="font-semibold text-gray-900">{project.estimatedDuration} days</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-semibold text-gray-900">{project.department}</p>
                </div>
              </div>

              {project.contractor && (
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contractor</p>
                    <p className="font-semibold text-gray-900">{project.contractor}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          {(project.startDate || project.endDate) && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
              <div className="flex items-center space-x-6">
                {project.startDate && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(project.startDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
                
                {project.endDate && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">End Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(project.endDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
            <div className="space-y-3">
              {project.aiRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Location */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            </div>
            <p className="text-gray-700 mb-4">{project.location.address}</p>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Map integration would display here</p>
            </div>
          </div>

          {/* Conflicts */}
          {project.conflicts.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm">
              <div className="p-6 border-b border-red-200 bg-red-50 rounded-t-xl">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Conflicts Detected</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {project.conflicts.map((conflict, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-red-100 p-1 rounded-full">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                      </div>
                      <p className="text-sm text-gray-700">{conflict}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nearby Projects */}
          {conflictingProjects.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Projects</h3>
              <div className="space-y-3">
                {conflictingProjects.map((nearbyProject) => (
                  <div key={nearbyProject.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm">{nearbyProject.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{nearbyProject.type} • {nearbyProject.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Edit Project
              </button>
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg font-medium transition-colors">
                Schedule Meeting
              </button>
              <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-4 rounded-lg font-medium transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}