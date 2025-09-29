export const THEME_COLORS = {
  primary: '#044866',
  secondary: '#0D5468',
  accent: '#F7A619',
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const;

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'Private': return 'text-white';
    case 'Public': return 'text-white';
    case 'Government': return 'text-white';
    case 'Not-for-profit': return 'text-white';
    default: return 'text-gray-800';
  }
};

export const getTypeStyle = (type: string) => {
  switch (type) {
    case 'Private': return { backgroundColor: THEME_COLORS.primary };
    case 'Public': return { backgroundColor: THEME_COLORS.secondary };
    case 'Government': return { backgroundColor: THEME_COLORS.accent };
    case 'Not-for-profit': return { backgroundColor: THEME_COLORS.primary, opacity: 0.8 };
    default: return { backgroundColor: THEME_COLORS.gray[100] };
  }
};

export const createGradientStyle = (fromColor: string, toColor: string, opacity = 1) => ({
  background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
  ...(opacity !== 1 && { opacity })
});

export const primaryGradient = createGradientStyle(THEME_COLORS.primary, THEME_COLORS.secondary);
export const accentGradient = createGradientStyle(THEME_COLORS.accent, THEME_COLORS.primary);
export const successGradient = createGradientStyle(THEME_COLORS.accent, THEME_COLORS.secondary);