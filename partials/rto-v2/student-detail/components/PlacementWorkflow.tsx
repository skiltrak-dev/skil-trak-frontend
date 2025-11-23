import { Check, Circle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "@components";

const steps = [
  { name: "Student Added", status: "completed", date: "Oct 28, 2025", description: "Student enrolled in program" },
  { name: "Request Generated", status: "completed", date: "Oct 30, 2025", description: "Placement request created" },
  { name: "Waiting for RTO", status: "completed", date: "Nov 2, 2025", description: "RTO approval received" },
  { name: "Waiting for Student", status: "completed", date: "Nov 4, 2025", description: "Student documents submitted" },
  { name: "Waiting for Industry", status: "completed", date: "Nov 6, 2025", description: "Workplace confirmed availability" },
  { name: "Appointment", status: "current", date: "Nov 18, 2025", description: "Orientation scheduled" },
  { name: "Agreement Pending", status: "upcoming", date: "Expected: Nov 25, 2025", description: "Awaiting signed agreement" },
  { name: "Agreement Signed", status: "upcoming", date: "Expected: Nov 28, 2025", description: "Final documentation" },
  { name: "Placement Started", status: "upcoming", date: "Expected: Dec 1, 2025", description: "Begin workplace hours" },
  { name: "Schedule Completed", status: "upcoming", date: "Expected: Dec 14, 2025", description: "Finish placement hours" }
];

export function PlacementWorkflow() {
  const completedSteps = steps.filter(s => s.status === "completed").length;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900">Placement Workflow</h3>
          <p className="text-sm text-slate-600 mt-1">Track your placement journey from start to completion</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primaryNew" />
            <span className="text-2xl text-primaryNew">{progressPercent}%</span>
          </div>
          <p className="text-sm text-slate-600">{completedSteps} of {totalSteps} steps</p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8">
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryNew to-primaryNew rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-secondary" />
        <div 
          className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primaryNew to-primaryNew transition-all duration-500"
          style={{ height: `${(completedSteps / (totalSteps - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Step Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                step.status === "completed"
                  ? 'bg-gradient-to-br from-primaryNew to-primaryNew text-white shadow-primaryNew/30'
                  : step.status === "current"
                  ? 'bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 text-white shadow-[#F7A619]/30 ring-4 ring-[#F7A619]/20'
                  : 'bg-white border-2 border-secondary text-slate-400'
              }`}>
                {step.status === "completed" ? (
                  <Check className="w-6 h-6" />
                ) : step.status === "current" ? (
                  <Clock className="w-6 h-6" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              {/* Step Content */}
              <div className={`flex-1 pb-2 transition-all duration-300 ${
                step.status === "current" 
                  ? 'bg-gradient-to-r from-[#F7A619]/10 to-transparent rounded-lg p-4 -ml-2' 
                  : ''
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`transition-all duration-300 ${
                        step.status === "completed"
                          ? 'text-slate-900'
                          : step.status === "current"
                          ? 'text-[#F7A619]'
                          : 'text-slate-400'
                      }`}>
                        {step.name}
                      </h4>
                      {step.status === "current" && (
                        <Badge variant="warning" text="In Progress" Icon={Clock} />
                      )}
                      {step.status === "completed" && (
                        <Badge variant="success" text="Completed" Icon={Check} />
                      )}
                      {step.status === "upcoming" && (
                        <Badge variant="secondary" outline text="Upcoming" />
                      )}
                    </div>
                    <p className={`text-sm mb-1 ${
                      step.status === "completed" || step.status === "current"
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    }`}>
                      {step.description}
                    </p>
                    <p className={`text-xs ${
                      step.status === "completed"
                        ? 'text-slate-500'
                        : step.status === "current"
                        ? 'text-[#F7A619]'
                        : 'text-slate-400'
                    }`}>
                      {step.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Status Summary */}
      <div className="mt-8 pt-6 border-t border-secondary">
        <div className="bg-gradient-to-r from-[#F7A619]/10 to-[#F7A619]/5 rounded-xl p-4 border border-[#F7A619]/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F7A619] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 mb-1">Current Stage: Appointment</p>
              <p className="text-sm text-slate-600">
                You're currently in the appointment phase. Your workplace orientation is scheduled. 
                Complete this step to move forward with the agreement process.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>{completedSteps} completed</span>
                </div>
                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-[#F7A619]" />
                  <span>1 in progress</span>
                </div>
                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>{totalSteps - completedSteps - 1} remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}