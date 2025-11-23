import { Check, Clock, Sparkles, TrendingUp, X, AlertTriangle, Ban, MoreVertical } from "lucide-react";
import { Badge, Button, TableAction } from "@components";

export function CurrentStatus() {
  const statuses = [
    { label: "Student Added", completed: true, date: "Sep 10, 2025" },
    { label: "Request Generated", completed: true, date: "Sep 12, 2025" },
    { label: "Waiting for RTO", completed: true, date: "Sep 15, 2025" },
    { label: "Waiting for Student", completed: true, date: "Sep 18, 2025" },
    { label: "Waiting for Industry", completed: true, date: "Sep 22, 2025" },
    { label: "Appointment", completed: true, date: "Oct 5, 2025" },
    { label: "Agreement Pending", completed: true, date: "Oct 12, 2025" },
    { label: "Agreement Signed", completed: true, date: "Oct 20, 2025" },
    { label: "Placement Started", completed: true, date: "Nov 1, 2025" },
    { label: "Schedule Completed", completed: false, current: true, date: null },
    { label: "Completed", completed: false, date: null },
  ];

  const completedCount = statuses.filter(s => s.completed).length;
  const totalCount = statuses.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary shadow-xl shadow-slate-200/50 p-5 hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-slate-900 mb-0.5 flex items-center gap-2">
            Current Status
            <Sparkles className="w-4 h-4 text-[#F7A619]" />
          </h2>
          <p className="text-sm text-slate-600">Placement workflow progress</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-2 mb-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-primaryNew" />
              <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primaryNew to-primaryNew">{progressPercent}%</span>
            </div>
            <p className="text-xs text-slate-600">{completedCount} of {totalCount} steps</p>
          </div>

          {/* Workflow Actions Menu */}
          <TableAction
            rowItem={{}}
            options={[
              {
                text: 'Mark as On Hold',
                Icon: AlertTriangle,
                onClick: () => {},
                color: 'text-warning',
              },
              {
                text: 'Cancel Request',
                Icon: Ban,
                onClick: () => {},
                color: 'text-red-400',
              },
              {
                text: 'Terminate Placement',
                Icon: X,
                onClick: () => {},
                color: 'text-red-400',
              },
              {
                text: 'Request Extension',
                Icon: Clock,
                onClick: () => {},
              },
              {
                text: 'Mark Complete Early',
                Icon: Check,
                onClick: () => {},
              },
            ]}
          >
            <Button variant="primaryNew" outline mini Icon={MoreVertical} />
          </TableAction>
        </div>
      </div>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary to-slate-100" />
        <div 
          className="absolute left-3.5 top-0 w-0.5 bg-gradient-to-b from-primaryNew via-primaryNew to-primaryNew transition-all duration-500 shadow-lg"
          style={{ height: `${(statuses.filter(s => s.completed).length / (statuses.length - 1)) * 100}%` }}
        />
        
        <div className="space-y-4">
          {statuses.map((status, index) => (
            <div key={index} className={`relative flex items-center gap-3.5 transition-all duration-300 ${
              status.current ? 'scale-105' : ''
            }`}>
              {/* Status Icon */}
              <div className={`relative z-10 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                status.completed 
                  ? 'bg-gradient-to-br from-primaryNew to-primaryNew text-white shadow-primaryNew/40 scale-100'
                  : status.current
                  ? 'bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 text-white shadow-[#F7A619]/40 ring-4 ring-[#F7A619]/20 animate-pulse'
                  : 'bg-white border-2 border-secondary text-slate-400'
              }`}>
                {status.completed ? (
                  <Check className="w-3.5 h-3.5" />
                ) : status.current ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </div>
              
              {/* Status Label */}
              <div className={`flex-1 py-1.5 px-2.5 rounded-xl transition-all duration-300 ${
                status.current 
                  ? 'bg-gradient-to-r from-[#F7A619]/10 to-transparent border border-[#F7A619]/20'
                  : status.completed
                  ? 'hover:bg-slate-50/50'
                  : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`text-sm transition-all duration-300 ${
                      status.completed 
                        ? 'text-slate-700'
                        : status.current
                        ? 'text-[#F7A619]'
                        : 'text-slate-400'
                    } ${status.current ? 'font-medium' : ''}`}>
                      {status.label}
                    </p>
                    
                    {/* Date Stamp */}
                    {status.date && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {status.date}
                      </p>
                    )}
                    
                    {/* Expected Date for Current */}
                    {status.current && !status.date && (
                      <p className="text-xs text-amber-600 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        Expected: Dec 10, 2025
                      </p>
                    )}
                  </div>
                  
                  {/* Current Badge */}
                  {status.current && (
                    <Badge variant="warning" text="In Progress" Icon={Clock} size="xs" />
                  )}
                  
                  {status.completed && (
                    <Check className="w-3.5 h-3.5 text-primaryNew" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-5 pt-4 border-t border-secondary">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="text-center p-2 bg-primaryNew/10 rounded-xl border border-primaryNew/20">
            <p className="text-xl text-primaryNew mb-0.5">{completedCount}</p>
            <p className="text-xs text-slate-600">Completed</p>
          </div>
          <div className="text-center p-2 bg-[#F7A619]/10 rounded-xl border border-[#F7A619]/20">
            <p className="text-xl text-[#F7A619] mb-0.5">1</p>
            <p className="text-xs text-slate-600">In Progress</p>
          </div>
          <div className="text-center p-2 bg-secondary rounded-xl border border-secondary">
            <p className="text-xl text-slate-700 mb-0.5">{totalCount - completedCount - 1}</p>
            <p className="text-xs text-slate-600">Remaining</p>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-4 p-3 bg-gradient-to-r from-secondary to-transparent rounded-xl border border-secondary">
        <p className="text-xs text-slate-600 mb-2">Quick Actions Available:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="warning" outline text="On Hold" size="xs" />
          <Badge variant="error" outline text="Cancelled" size="xs" />
          <Badge variant="error" outline text="Terminated" size="xs" />
          <Badge variant="secondary" outline text="Extension" size="xs" />
        </div>
      </div>
    </div>
  );
}
