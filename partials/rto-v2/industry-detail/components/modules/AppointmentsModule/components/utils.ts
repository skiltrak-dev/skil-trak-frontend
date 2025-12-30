/**
 * Utility functions for Appointments Module
 */

import { Calendar, MapPin, Video, User, FileText, Image as ImageIcon, File } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const getTypeIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'interview':
      return User;
    case 'site-visit':
      return MapPin;
    case 'training':
      return Video;
    case 'meeting':
      return Calendar;
    default:
      return Calendar;
  }
};

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'interview':
      return 'Interview';
    case 'site-visit':
      return 'Site Visit';
    case 'training':
      return 'Training';
    case 'meeting':
      return 'Meeting';
    default:
      return type;
  }
};

export const getFileIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'pdf':
      return FileText;
    case 'image':
      return ImageIcon;
    case 'excel':
      return File;
    default:
      return File;
  }
};
