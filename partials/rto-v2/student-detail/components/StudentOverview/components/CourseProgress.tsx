import { TrendingUp, Clock, CheckCircle2, Circle, Zap, BarChart3 } from "lucide-react";

export function CourseProgress() {
  const streams = [
    { name: "Ageing Support", progress: 100, color: "#044866", icon: "✓" },
    { name: "Disability Support", progress: 56, color: "#0D5468", icon: "⚡" },
    { name: "Home & Community Care", progress: 15, color: "#F7A619", icon: "🏠" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary shadow-xl shadow-slate-200/50 p-[18px] hover:shadow-2xl transition-all">
      <div className="flex items-center gap-[9px] mb-[18px]">
        <div className="w-[32.4px] h-[32.4px] rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-lg shadow-primaryNew/20">
          <BarChart3 className="w-[16.2px] h-[16.2px] text-white" />
        </div>
        <div>
          <h3 className="text-slate-900 text-[16.2px]">Course Progress</h3>
          <p className="text-[12.6px] text-slate-600 mt-[1.8px]">Detailed breakdown of your learning journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        <div className="space-y-[14.4px]">
          <div className="relative overflow-hidden bg-gradient-to-br from-primaryNew/10 via-primaryNew/10 to-primaryNew/5 rounded-2xl p-[18px] border border-primaryNew/20 shadow-lg">
            <div className="absolute top-0 right-0 w-[86.4px] h-[86.4px] bg-gradient-to-br from-primaryNew/20 to-transparent rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-[9px] mb-[14.4px]">
                <div className="w-[32.4px] h-[32.4px] rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-lg shadow-primaryNew/20">
                  <TrendingUp className="w-[16.2px] h-[16.2px] text-white" />
                </div>
                <div>
                  <p className="text-[12.6px] text-slate-600">Overall Progress</p>
                  <p className="text-[13.5px] text-slate-900">💪 Great progress!</p>
                </div>
              </div>
              <div className="space-y-[9px]">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-600 text-[14.4px]">Completion</span>
                  <span className="text-[27px] text-transparent bg-clip-text bg-gradient-to-r from-primaryNew to-primaryNew">60%</span>
                </div>
                <div className="relative h-[9px] bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryNew to-primaryNew rounded-full"
                    style={{ width: '60%' }}
                  >
                    <div className="absolute inset-0 flex items-center px-[7.2px]">
                      <Zap className="w-[9px] h-[9px] text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[9px]">
            <div className="group bg-gradient-to-br from-primaryNew/5 to-primaryNew/10 rounded-xl p-[12.6px] border border-primaryNew/20 hover:border-primaryNew/40 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center justify-center w-[32.4px] h-[32.4px] rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew mb-[9px] mx-auto shadow-lg shadow-primaryNew/20 group-hover:scale-110 transition-transform">
                <Clock className="w-[16.2px] h-[16.2px] text-white" />
              </div>
              <p className="text-center text-[12.6px] text-slate-600 mb-[5.4px]">Total Hours</p>
              <p className="text-center text-[21.6px] text-slate-900">300</p>
            </div>

            <div className="group bg-gradient-to-br from-primaryNew/5 to-primaryNew/10 rounded-xl p-[12.6px] border border-primaryNew/20 hover:border-primaryNew/40 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center justify-center w-[32.4px] h-[32.4px] rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew mb-[9px] mx-auto shadow-lg shadow-primaryNew/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-[16.2px] h-[16.2px] text-white" />
              </div>
              <p className="text-center text-[12.6px] text-slate-600 mb-[5.4px]">Completed</p>
              <p className="text-center text-[21.6px] text-slate-900">180</p>
            </div>

            <div className="group bg-gradient-to-br from-[#F7A619]/5 to-[#F7A619]/10 rounded-xl p-[12.6px] border border-[#F7A619]/20 hover:border-[#F7A619]/40 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center justify-center w-[32.4px] h-[32.4px] rounded-xl bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 mb-[9px] mx-auto shadow-lg shadow-[#F7A619]/20 group-hover:scale-110 transition-transform">
                <Circle className="w-[16.2px] h-[16.2px] text-white" />
              </div>
              <p className="text-center text-[12.6px] text-slate-600 mb-[5.4px]">Remaining</p>
              <p className="text-center text-[21.6px] text-slate-900">120</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-[18px] border border-slate-200/60 shadow-inner">
          <h4 className="text-slate-900 mb-[14.4px] flex items-center gap-[7.2px] text-[16.2px]">
            <span>Progress Breakdown</span>
            <span className="text-[12.6px] text-slate-500">by stream</span>
          </h4>
          <div className="space-y-[14.4px]">
            {streams.map((stream, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-[7.2px]">
                  <div className="flex items-center gap-[7.2px]">
                    <span className="text-[14.4px]">{stream.icon}</span>
                    <span className="text-[12.6px] text-slate-700">{stream.name}</span>
                  </div>
                  <span className={`text-[12.6px] px-[9px] py-[3.6px] rounded-lg font-medium`}
                    style={{
                      backgroundColor: stream.progress === 100 ? '#044866' : `${stream.color}15`,
                      color: stream.progress === 100 ? '#ffffff' : stream.color
                    }}>
                    {stream.progress}%
                  </span>
                </div>
                <div className="relative h-[7.2px] bg-white/60 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${stream.progress}%`,
                      backgroundColor: stream.color
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[18px] pt-[14.4px] border-t border-secondary">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-[9px] border border-secondary">
              <span className="text-slate-700 flex items-center gap-[7.2px] text-[14.4px]">
                <TrendingUp className="w-[12.6px] h-[12.6px] text-primaryNew" />
                Average Progress
              </span>
              <span className="text-[16.2px] text-transparent bg-clip-text bg-gradient-to-r from-primaryNew to-primaryNew">57%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
