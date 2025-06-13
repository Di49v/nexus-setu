import React, { useState } from 'react';
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function AIScheduler() {
  const { projects } = useProjects();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [aiAnalysisResults, setAiAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pendingProjects = projects.filter(p => p.status === 'pending');

  const runAIAnalysis = () => {
    if (selectedProjects.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const selectedProjectData = projects.filter(p => selectedProjects.includes(p.id));
      
      const mockResults = {
        optimalSchedule: [
          {
            projectId: selectedProjects[0],
            recommendedStartDate: '2024-04-01',
            phase: 1,
            reasoning: 'Minimal conflicts with existing infrastructure'
          },
          ...(selectedProjects.length > 1 ? [{
            projectId: selectedProjects[1],
            recommendedStartDate: '2024-07-15',
            phase: 2,
            reasoning: 'Coordinate with phase 1 completion for resource efficiency'
          }] : [])
        ],
        costOptimization: {
          individualCost: selectedProjectData.reduce((sum, p) => sum + p.estimatedCost, 0),
          optimizedCost: selectedProjectData.reduce((sum, p) => sum + p.estimatedCost, 0) * 0.85,
          savings: selectedProjectData.reduce((sum, p) => sum + p.estimatedCost, 0) * 0.15,
          savingsPercentage: 15
        },
        resourceUtilization: {
          peakUtilization: '78%',
          averageUtilization: '65%',
          criticalResources: ['Excavators', 'Concrete Mixers', 'Skilled Labor']
        },
        riskAssessment: {
          level: 'Medium',
          factors: [
            'Weather dependency for Q2 construction',
            'Traffic management complexity',
            'Coordination with utility companies required'
          ]
        },
        recommendations: [
          'Phase 1: Start highway expansion in April to avoid monsoon delays',
          'Phase 2: Begin pipeline work post-highway foundation to minimize re-excavation',
          'Coordinate contractor schedules to share heavy machinery',
          'Implement smart traffic management during peak construction'
        ]
      };
      
      setAiAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="h-8 w-8" />
          <h1 className="text-2xl font-bold">AI Project Scheduler</h1>
        </div>
        <p className="text-green-100">
          Intelligent scheduling and optimization for infrastructure projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Projects for Analysis</h2>
            
            <div className="space-y-3 mb-6">
              {pendingProjects.map((project) => (
                <div
                  key={project.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedProjects.includes(project.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleProjectSelection(project.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{project.location.address}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>₹{(project.estimatedCost / 10000000).toFixed(1)}Cr</span>
                        <span>{project.estimatedDuration} days</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 ${
                      selectedProjects.includes(project.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedProjects.includes(project.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runAIAnalysis}
              disabled={selectedProjects.length === 0 || isAnalyzing}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                selectedProjects.length === 0 || isAnalyzing
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Run AI Analysis</span>
                </div>
              )}
            </button>

            {selectedProjects.length > 0 && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  {selectedProjects.length} project(s) selected for optimization
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis Results */}
        <div className="lg:col-span-2">
          {!aiAnalysisResults ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis Ready</h3>
              <p className="text-gray-600">
                Select projects from the sidebar and click "Run AI Analysis" to get intelligent 
                scheduling recommendations and cost optimization insights.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Optimal Schedule */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Optimal Schedule</h3>
                </div>
                <div className="space-y-4">
                  {aiAnalysisResults.optimalSchedule.map((item: any, index: number) => {
                    const project = projects.find(p => p.id === item.projectId);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{project?.title}</h4>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                            Phase {item.phase}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Recommended Start: {new Date(item.recommendedStartDate).toLocaleDateString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-700">{item.reasoning}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cost Optimization */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Cost Optimization</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Individual Cost</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{(aiAnalysisResults.costOptimization.individualCost / 10000000).toFixed(1)}Cr
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-600">Optimized Cost</p>
                    <p className="text-xl font-bold text-green-700">
                      ₹{(aiAnalysisResults.costOptimization.optimizedCost / 10000000).toFixed(1)}Cr
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-600">Savings</p>
                    <p className="text-xl font-bold text-blue-700">
                      ₹{(aiAnalysisResults.costOptimization.savings / 10000000).toFixed(1)}Cr
                    </p>
                    <p className="text-sm text-blue-600">
                      ({aiAnalysisResults.costOptimization.savingsPercentage}% reduction)
                    </p>
                  </div>
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Resource Utilization</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Peak Utilization</span>
                          <span className="font-medium">{aiAnalysisResults.resourceUtilization.peakUtilization}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average Utilization</span>
                          <span className="font-medium">{aiAnalysisResults.resourceUtilization.averageUtilization}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Critical Resources</h4>
                    <div className="space-y-1">
                      {aiAnalysisResults.resourceUtilization.criticalResources.map((resource: string, index: number) => (
                        <div key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                          {resource}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {aiAnalysisResults.recommendations.map((recommendation: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                </div>
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    aiAnalysisResults.riskAssessment.level === 'Low' ? 'bg-green-100 text-green-700' :
                    aiAnalysisResults.riskAssessment.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {aiAnalysisResults.riskAssessment.level} Risk
                  </span>
                </div>
                <div className="space-y-2">
                  {aiAnalysisResults.riskAssessment.factors.map((factor: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-700">{factor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Implement Schedule
                  </button>
                  <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg font-medium transition-colors">
                    Export Report
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                    Schedule Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}