import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@components';
import { useState } from 'react';

interface PremiumFeature {
  name: string;
  enabled: boolean;
  description: string;
}

const initialPremiumFeatures: PremiumFeature[] = [
  { name: 'Priority Consultation', enabled: true, description: '24/7 dedicated support' },
  { name: 'Legal Support', enabled: true, description: 'Compliance assistance' },
  { name: 'Exclusive Webinars', enabled: true, description: 'Monthly training sessions' },
  { name: 'Simulation Tools', enabled: false, description: 'Virtual training environment' },
  { name: 'Job Ads Priority', enabled: true, description: 'Featured listings' },
  { name: 'Volunteer Network', enabled: false, description: 'Community connections' }
];

export function PremiumFeatures() {
  const [premiumFeaturesState, setPremiumFeaturesState] = useState(initialPremiumFeatures);

  const togglePremiumFeature = (index: number) => {
    const updatedFeatures = [...premiumFeaturesState];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      enabled: !updatedFeatures[index].enabled
    };
    setPremiumFeaturesState(updatedFeatures);
  };

  return (
    <div className="bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl shadow-lg p-3 flex-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white flex items-center gap-1.5 text-sm">
          <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-3 h-3 text-white" />
          </div>
          Premium Features
        </h3>
        <span className="text-[10px] text-white bg-white/20 px-2 py-0.5 rounded-full">
          Premium
        </span>
      </div>
      
      <div className="space-y-2">
        {premiumFeaturesState.map((feature, index) => (
          <Button 
            key={index} 
            onClick={() => togglePremiumFeature(index)}
            variant="secondary"
            className="w-full flex items-start gap-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer h-auto justify-start"
          >
            <CheckCircle 
              className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-all duration-300 ${feature.enabled ? 'text-[#10B981]' : 'text-white/30'}`} 
              fill={feature.enabled ? 'currentColor' : 'none'}
            />
            <div className="flex-1 text-left">
              <p className={`text-xs font-medium transition-colors ${feature.enabled ? 'text-white' : 'text-white/50'}`}>
                {feature.name}
              </p>
              <p className={`text-[10px] transition-colors ${feature.enabled ? 'text-white/80' : 'text-white/40'}`}>
                {feature.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
      
      <Button variant="secondary" className="mt-3 w-full py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition-all border border-white/30 h-auto">
        Manage Features
      </Button>
    </div>
  );
}
