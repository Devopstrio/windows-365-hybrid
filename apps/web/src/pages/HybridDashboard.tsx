import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Monitor, 
  Users, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Cpu,
  ChevronRight,
  CheckCircle,
  Zap,
  ShieldCheck,
  DollarSign,
  Network
} from 'lucide-react';

const sessionData = [
  { name: '08:00', users: 120, latency: 25 },
  { name: '10:00', users: 450, latency: 32 },
  { name: '12:00', users: 380, latency: 28 },
  { name: '14:00', users: 510, latency: 35 },
  { name: '16:00', users: 490, latency: 30 },
  { name: '18:00', users: 220, latency: 24 },
  { name: '20:00', users: 80, latency: 22 },
];

const KPI_CARDS = [
  { title: 'Provisioned PCs', value: '1,245', trend: '+45', color: 'cyan', icon: Monitor },
  { title: 'Identity Health', value: '99.8%', trend: '+0.1%', color: 'cyan', icon: Users },
  { title: 'Device Compliance', value: '96.4%', trend: '+1.2%', color: 'cyan', icon: ShieldCheck },
  { title: 'Avg Latency', value: '28ms', trend: '-2ms', color: 'cyan', icon: Activity },
];

const HybridDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hybrid Workplace Command Center</h1>
          <p className="text-slate-400">Enterprise-grade Windows 365 orchestration, identity integration, and endpoint governance.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-800">
            Export Fleet Report
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-cyan-600/20">
            Sync Identity Stack
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-cyan-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-cyan-400`} />
              </div>
              <div className={`text-xs font-medium text-cyan-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Trends */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">User Session & Latency Metrics</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessionData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#06b6d4" fill="url(#colorUsers)" name="Active Users" />
                <Area type="monotone" dataKey="latency" stroke="#f43f5e" fill="none" name="Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Cloud PC Spec Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: '2vCPU / 8GB / 128GB', score: 65, color: 'bg-cyan-500', status: 'STANDARD' },
              { label: '4vCPU / 16GB / 256GB', score: 25, color: 'bg-cyan-500', status: 'PREMIUM' },
              { label: '8vCPU / 32GB / 512GB', score: 10, color: 'bg-cyan-600', status: 'POWER' },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{node.label}</span>
                  <span className="text-slate-400 font-bold">{node.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex gap-3">
            <Zap className="text-cyan-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Identity Status: <span className="text-cyan-400 font-bold">Hybrid Joined</span>. All Cloud PCs are synchronized with local AD and Intune management.</p>
          </div>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Managed Cloud PC Fleet</h3>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View All Devices</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">User / UPN</th>
                <th className="px-6 py-4 font-semibold">Device ID</th>
                <th className="px-6 py-4 font-semibold">Spec</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Compliance</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { user: 'John Doe', upn: 'jdoe@corp.com', id: 'CPC-A1B2C3', spec: '2vCPU/8GB', status: 'ACTIVE', compliance: 'COMPLIANT' },
                { user: 'Alice Smith', upn: 'asmith@corp.com', id: 'CPC-Z9Y8X7', spec: '4vCPU/16GB', status: 'ACTIVE', compliance: 'COMPLIANT' },
                { user: 'Bob Wilson', upn: 'bwilson@corp.com', id: 'CPC-D4E5F6', spec: '2vCPU/8GB', status: 'PROVISIONING', compliance: 'PENDING' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200">{row.user}</span>
                      <span className="text-xs text-slate-500">{row.upn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.spec}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'ACTIVE' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${row.compliance === 'COMPLIANT' ? 'text-cyan-400' : 'text-slate-600'}`} />
                      <span className="text-xs font-bold text-slate-400">{row.compliance}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HybridDashboard;
