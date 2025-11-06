import { motion } from "framer-motion";
import { SearchX, UserPlus, HelpCircle, AlertCircle } from "lucide-react";
import { Student } from "./StudentSearchBar";
import { SearchSuggestions } from "./SearchSuggestions";
import { Button } from "@components";

interface EmptySearchStateProps {
  searchQuery: string;
  students?: Student[];
  onClearSearch?: () => void;
  onRequestHelp?: () => void;
  onSelectStudent?: (student: Student) => void;
}

export function EmptySearchState({ 
  searchQuery, 
  students = [], 
  onClearSearch, 
  onRequestHelp,
  onSelectStudent 
}: EmptySearchStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 rounded-full bg-muted/50 p-8"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <SearchX className="h-16 w-16 text-muted-foreground" />
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 max-w-md space-y-2"
      >
        <h3 className="text-xl">No Students Found</h3>
        <p className="text-sm text-muted-foreground">
          We couldn't find any students matching{" "}
          <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
            {searchQuery}
          </span>
        </p>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6 max-w-md space-y-2 text-left"
      >
        <p className="text-sm text-muted-foreground">Try the following:</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">•</span>
            <span>Check the spelling of the student's name</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">•</span>
            <span>Try searching by Student ID or email address</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">•</span>
            <span>Use fewer or different keywords</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">•</span>
            <span>Verify the student is enrolled in the system</span>
          </li>
        </ul>
      </motion.div>

      {/* Suggestions */}
      {students.length > 0 && onSelectStudent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-md"
        >
          <SearchSuggestions
            searchQuery={searchQuery}
            students={students}
            onSelectStudent={onSelectStudent}
          />
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        {onClearSearch && (
          <Button variant="secondary" onClick={onClearSearch} className="gap-2">
            <SearchX className="h-4 w-4" />
            Clear Search
          </Button>
        )}
        <Button variant="primaryNew" onClick={onRequestHelp} className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Request Help
        </Button>
        <Button variant="secondary" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Student
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function NoResultsInDropdown({ searchQuery }: { searchQuery: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h4 className="mb-2">No students found</h4>
      <p className="mb-4 text-sm text-muted-foreground">
        No students match{" "}
        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          {searchQuery}
        </span>
      </p>
      <div className="space-y-1.5 text-left text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Suggestions:</p>
        <ul className="space-y-1">
          <li>• Check spelling</li>
          <li>• Try Student ID or email</li>
          <li>• Use fewer keywords</li>
        </ul>
      </div>
    </motion.div>
  );
}
