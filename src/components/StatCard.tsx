import { LucideIcon } from "lucide-react";

interface StatProps {
  icon: LucideIcon;
  number: string;
  label: string;
}

const StatCard = ({ icon: Icon, number, label }: StatProps) => {
  return (
    <div className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/30 hover:border-kenya-gold/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl animate-fade-in cursor-pointer">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-kenya-gold/10 to-warm-orange/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Icon Container */}
      <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-kenya-gold/30 to-warm-orange/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
        <Icon className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Number with Gradient */}
      <div className="relative z-10 text-4xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent mb-2 group-hover:from-kenya-gold group-hover:to-yellow-400 transition-all duration-300">
        {number}
      </div>
      
      {/* Label */}
      <div className="relative z-10 text-white/90 text-sm font-medium group-hover:text-white transition-colors duration-300">
        {label}
      </div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-kenya-gold via-warm-orange to-kenya-gold bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default StatCard;