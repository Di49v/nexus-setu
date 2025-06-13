import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function Dashboard() {
  const { projects } = useProjects();

  const stats = {
    total: projects.length,
    pending: projects.filter(p => p.status === 'pending').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    conflicts: projects.filter(p => p.conflicts.length > 0).length,
    totalCost: projects.reduce((sum, p) => sum + p.estimatedCost, 0)
  };

  const recentProjects = projects.slice(0, 5);
  const criticalProjects = projects.filter(p => p.priority === 'critical' || p.conflicts.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Infrastructure Coordination Dashboard</h1>
        <p className="text-blue-100">Centralized project management and AI-powered scheduling</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conflicts</p>
              <p className="text-2xl font-bold text-red-600">{stats.conflicts}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">₹{(stats.totalCost / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <Link to="/map" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.location.address}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>₹{(project.estimatedCost / 10000000).toFixed(1)}Cr</span>
                      <span>{project.estimatedDuration} days</span>
                      <span>{project.department}</span>
                    </div>
                  </div>
                  {project.conflicts.length > 0 && (
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/projects/new"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center block transition-colors"
              >
                Submit New Project
              </Link>
              <Link
                to="/map"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium text-center block transition-colors"
              >
                View Project Map
              </Link>
              <Link
                to="/ai-scheduler"
                className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg font-medium text-center block transition-colors"
              >
                AI Scheduling
              </Link>
            </div>
          </div>

          {/* Critical Issues */}
          {criticalProjects.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm">
              <div className="p-6 border-b border-red-200 bg-red-50 rounded-t-xl">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Critical Issues</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {criticalProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-start space-x-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{project.title}</p>
                      <p className="text-xs text-gray-600">
                        {project.conflicts.length} conflicts detected
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="bg-green-500 w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Optimal Scheduling</p>
                  <p className="text-gray-600">3 projects can be coordinated for 25% cost savings</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-yellow-500 w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Resource Optimization</p>
                  <p className="text-gray-600">Contractor availability suggests Q2 start for highway project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}