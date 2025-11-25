import { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { Card } from "@components";

interface KPIStatCardProps {
    label: string;
    value: number | string;
    icon?: LucideIcon;
    variant?: "default" | "success" | "warning" | "destructive";
    trend?: { value: number; isPositive: boolean };
    subtitle?: string
}

export function KPIStatCard({ label, subtitle, value, icon: Icon, variant = "default", trend }: KPIStatCardProps) {
    const variantStyles = {
        default: "bg-card/80 backdrop-blur-sm border-border",
        // primary: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50 dark:border-indigo-800/30",
        success: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/50 dark:border-emerald-800/30",
        warning: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/30",
        destructive: "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200/50 dark:border-red-800/30",

    };

    const valueStyles = {
        default: "text-foreground",
        // primary: "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent",
        success: "bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent",
        warning: "bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent",
        destructive: "bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent",
    };

    const iconBgStyles = {
        default: "bg-muted/50",
        // primary: "bg-gradient-to-br from-indigo-500 to-purple-500",
        success: "bg-gradient-to-br from-emerald-500 to-teal-500",
        warning: "bg-gradient-to-br from-amber-500 to-orange-500",
        destructive: "bg-gradient-to-br from-red-500 to-pink-500",
    };

    return (
        <Card className={`${variantStyles[variant]} hover-lift shadow-lg overflow-hidden relative group`}>
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full" style={{ animation: "shimmer 2s infinite" }} />

            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                        <p className="text-sm text-muted-foreground font-medium">{label}</p>
                        <div className="flex items-baseline gap-2">
                            <p className={`text-4xl font-bold tabular-nums ${valueStyles[variant]}`}>
                                {typeof value === "number" ? <AnimatedCounter value={value} /> : value}
                            </p>
                            {trend && (
                                <span className={`text-xs font-medium ${trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                    {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                                </span>
                            )}
                        </div>
                    </div>
                    {Icon && (
                        <div className={`p-3 rounded-xl ${iconBgStyles[variant]} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <Icon className={`h-6 w-6 ${variant === "default" ? "text-muted-foreground" : "text-white"}`} />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
