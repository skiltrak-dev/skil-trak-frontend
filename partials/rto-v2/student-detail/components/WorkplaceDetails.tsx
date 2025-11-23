import { Building2, MapPin, User, Phone, Clock, Calendar, TrendingUp, Award, Mail } from "lucide-react";
import { Button, Badge, InitialAvatar } from "@components";

export function WorkplaceDetails() {
  const placementStats = [
    { label: "Hours Completed", value: "145", total: "240", percent: 60 },
    { label: "Days Attended", value: "18", total: "30", percent: 60 },
    { label: "Skills Assessed", value: "12", total: "20", percent: 60 }
  ];

  const recentActivities = [
    { date: "Nov 18, 2025", activity: "Client Care Session", duration: "6 hours", status: "completed" },
    { date: "Nov 15, 2025", activity: "Skills Assessment", duration: "4 hours", status: "completed" },
    { date: "Nov 13, 2025", activity: "Team Meeting & Training", duration: "3 hours", status: "completed" },
    { date: "Nov 11, 2025", activity: "Client Activities Coordination", duration: "7 hours", status: "completed" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Workplace Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-slate-900 mb-6">Workplace Details</h3>

        <div className="bg-gradient-to-br from-primaryNew/10 to-primaryNew/10 rounded-xl p-6 border border-primaryNew/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 mb-1">Hale Foundation</h3>
                <p className="text-slate-600">Leading Aged Care & Disability Support Provider</p>
                <Badge variant="success" text="Active Placement" className="mt-2" />
              </div>
            </div>
            <Button variant="primaryNew" text="View Full Profile" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primaryNew/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primaryNew" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <p className="text-slate-900">16 Sarre Place</p>
                <p className="text-sm text-slate-600">Marangaroo WA 6064</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primaryNew/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primaryNew" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Supervisor</p>
                <p className="text-slate-900">Sarah Mitchell</p>
                <p className="text-sm text-slate-600">Senior Care Coordinator</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7A619]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#F7A619]" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Contact</p>
                <p className="text-slate-900">+61 8 9247 8888</p>
                <p className="text-sm text-slate-600">Mon-Fri, 8AM-5PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Progress */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-slate-900">Placement Progress</h4>
            <p className="text-sm text-slate-600 mt-1">Track your workplace placement milestones</p>
          </div>
          <div className="text-right">
            <p className="text-3xl text-primaryNew">60%</p>
            <p className="text-sm text-slate-600">Complete</p>
          </div>
        </div>
        
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden shadow-inner mb-6">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryNew to-primaryNew rounded-full transition-all duration-500"
            style={{ width: '60%' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placementStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl text-slate-900">{stat.value}</span>
                <span className="text-slate-500">/ {stat.total}</span>
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryNew to-primaryNew rounded-full transition-all duration-500"
                  style={{ width: `${stat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-slate-900">Recent Workplace Activities</h4>
            <p className="text-sm text-slate-600 mt-1">Your latest placement sessions</p>
          </div>
          <Button variant="primaryNew" outline text="View All Activities" />
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-slate-100 hover:border-primaryNew transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primaryNew/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primaryNew" />
                </div>
                <div>
                  <p className="text-slate-900">{activity.activity}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </p>
                    <p className="text-sm text-slate-600">{activity.duration}</p>
                  </div>
                </div>
              </div>
              <Badge variant="success" text={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)} />
            </div>
          ))}
        </div>
      </div>

      {/* Supervisor Contact Card */}
      <div className="bg-gradient-to-br from-primaryNew/5 to-primaryNew/5 rounded-xl border border-primaryNew/20 p-6">
        <h4 className="text-slate-900 mb-4">Workplace Supervisor Contact</h4>
        <div className="flex items-start gap-4">
          <InitialAvatar name="Sarah Mitchell" large />
          <div className="flex-1">
            <p className="text-slate-900 mb-1">Sarah Mitchell</p>
            <p className="text-slate-600 text-sm mb-3">Senior Care Coordinator</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <span>+61 3 9876 5444</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4" />
                <span>s.mitchell@halefoundation.org.au</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primaryNew" outline Icon={Phone} text="Call" />
            <Button variant="primaryNew" outline Icon={Mail} text="Email" />
          </div>
        </div>
      </div>
    </div>
  );
}