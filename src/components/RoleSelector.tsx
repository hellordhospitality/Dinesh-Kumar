import React from 'react';
import { UserRole } from '../types';
import { Shield, Briefcase, Eye, BarChart, HeartHandshake, UserCheck } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export default function RoleSelector({ currentRole, onChangeRole }: RoleSelectorProps) {
  const roles: { id: UserRole; name: string; desc: string; icon: any; color: string }[] = [
    { 
      id: 'super_admin', 
      name: 'Super Admin', 
      desc: 'Platform-wide controls, billing and multi-hotel configuration', 
      icon: Shield,
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    { 
      id: 'agency_admin', 
      name: 'Agency Admin', 
      desc: 'Campaign parameters, hotel accounts, and performance reports', 
      icon: Briefcase,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    },
    { 
      id: 'hotel_owner', 
      name: 'Hotel Owner', 
      desc: 'High-level financial KPIs, RevPAR tracking, and occupancy lists', 
      icon: BarChart,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    { 
      id: 'marketing_manager', 
      name: 'Marketing Manager', 
      desc: 'Social schedule, AI captions, WhatsApp broadcasts, GMB reviews', 
      icon: Eye,
      color: 'bg-pink-100 text-pink-700 border-pink-200'
    },
    { 
      id: 'sales_team', 
      name: 'Sales Team', 
      desc: 'Lead execution pipeline, status toggles, and client profiles', 
      icon: HeartHandshake,
      color: 'bg-amber-100 text-amber-700 border-amber-200'
    }
  ];

  return (
    <div id="role-selector-container" className="bg-white border-b border-gray-100 p-4 shrink-0 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 rounded-lg text-[#B04285]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Active User Workspace</h2>
            <p className="text-xs text-gray-500">Switch roles to simulate different user experiences and custom dashboards</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onChangeRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#B04285] text-white border-[#B04285] shadow-xs cursor-default'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={r.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                {r.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
