import { motion } from 'framer-motion';
import { HeaderTitle } from './HeaderTitle';
import { HeaderActions } from './HeaderActions';
import { CoursesSearchBar } from '../CoursesSearchBar';
import { CoursesStatisticsGrid } from './CoursesStatisticsGrid';

interface CoursesHeaderSectionProps {
  showSearch: boolean;
  searchQuery: string;
  totalCourses: number;
  totalStudents: number;
  totalCapacity: number;
  overallCapacity: number;
  onToggleSearch: () => void;
  onSearchChange: (value: string) => void;
}

export function CoursesHeaderSection({
  showSearch,
  searchQuery,
  totalCourses,
  totalStudents,
  totalCapacity,
  overallCapacity,
  onToggleSearch,
  onSearchChange
}: CoursesHeaderSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white via-[#F8FAFB] to-[#E8F4F8] rounded-lg border border-[#E2E8F0] p-3 shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <HeaderTitle />
        <HeaderActions showSearch={showSearch} onToggleSearch={onToggleSearch} />
      </div>

      {/* Search Bar */}
      <CoursesSearchBar 
        showSearch={showSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      {/* Statistics Grid - Premium */}
      <CoursesStatisticsGrid
        totalCourses={totalCourses}
        totalStudents={totalStudents}
        totalCapacity={totalCapacity}
        overallCapacity={overallCapacity}
      />
    </motion.div>
  );
}
