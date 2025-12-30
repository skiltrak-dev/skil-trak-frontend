import { Clock } from 'lucide-react';

export function TradingHoursHeader() {
  return (
    <div>
      <h3 className="text-[#1A2332] text-sm font-bold mb-0.5 flex items-center gap-1.5">
        <div className="w-6 h-6 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center shadow-sm">
          <Clock className="w-3 h-3 text-white" />
        </div>
        Weekly Trading Hours
      </h3>
      <p className="text-[10px] text-[#64748B]">Configure your weekly operating schedule and break times</p>
    </div>
  );
}
