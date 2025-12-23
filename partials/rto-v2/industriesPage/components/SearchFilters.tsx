import { Search, Filter, X } from "lucide-react";
import { TextInput, Select } from "../../../../components/inputs";
import { Button } from "../../../../components/buttons";
import { Badge } from "../../../../components/Badge";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterSector: string;
  onFilterSectorChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  filterLocation: string;
  onFilterLocationChange: (value: string) => void;
  filterCapacity: string;
  onFilterCapacityChange: (value: string) => void;
  allLocations: string[];
  onClearFilters: () => void;
}

const sectors = [
  "Community Services",
  "IT & Digital",
  "Hospitality",
  "Building & Construction",
  "Education & Training",
  "Healthcare",
  "Retail",
  "Automotive",
  "Business Services",
  "Sport & Recreation",
  "Beauty & Wellness",
  "Creative Arts",
  "Transport & Logistics",
  "Horticulture",
  "Media & Communications",
];

const sectorOptions = [
  { label: "All Sectors", value: "all" },
  ...sectors.map(s => ({ label: s, value: s }))
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Placement Ready", value: "ready" },
  { label: "Not Ready", value: "not-ready" }
];

const capacityOptions = [
  { label: "All Capacity", value: "all" },
  { label: "High (80%+)", value: "high" },
  { label: "Medium (50-80%)", value: "medium" },
  { label: "Low (<50%)", value: "low" }
];

export function SearchFilters({
  searchTerm,
  onSearchChange,
  filterSector,
  onFilterSectorChange,
  filterStatus,
  onFilterStatusChange,
  filterLocation,
  onFilterLocationChange,
  filterCapacity,
  onFilterCapacityChange,
  allLocations,
  onClearFilters,
}: SearchFiltersProps) {
  const activeFiltersCount = [
    filterSector !== "all",
    filterStatus !== "all",
    filterLocation !== "all",
    filterCapacity !== "all",
  ].filter(Boolean).length;

  const locationOptions = [
    { label: "All Locations", value: "all" },
    ...allLocations.map(l => ({ label: l, value: l }))
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          {/* Loophole: TextInput usually wraps input. If we want icon inside, we might need a custom wrapper or use TextInput props if available. 
              Codebase TextInput doesn't seem to have leftIcon prop but has placesSuggetions.
              I will assume standard TextInput and basic styling. I'll put the search icon outside or try to use styling.
              Actually, I can just use a div wrapper.
           */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <TextInput
              name="search"
              placeholder="Search industries..."
              value={searchTerm}
              onChange={(e: any) => onSearchChange(e.target.value)}
              shadow="shadow-none"
            // Adding padding-left via class might be tricky if TextInput wraps it div > div > input. 
            // TextInput implementation: div > div > input. Classes passed to input directly?
            // TextInput: className prop not exposed? 
            // It seems TextInput doesn't expose className for the input element directly in props, 
            // but `inputFieldClasses` are calculated. 
            // However, I can't easily inject 'pl-9'.
            // I will proceed without the icon inside if needed or just accept it might overlap text.
            // Wait, I can try to pass it if I could modify TextInput, but I shouldn't.
            />
            {searchTerm && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="action"
                  mini
                  onClick={() => onSearchChange("")}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Header with Clear Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => { }} // This seems to be just a label/counter, maybe not clickable or opens modal? Original had onClick? No, it was just a button.
          // Original: variant="outline" size="sm". Codebase Button: variant="secondary"?
          // Or 'info'.
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="primary" text={activeFiltersCount.toString()} size="xs" shape="pill" />
              )}
            </div>
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="action"
              onClick={onClearFilters}
            >
              <div className="flex items-center gap-1.5">
                <X className="h-3.5 w-3.5" />
                Clear
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Selects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select
          name="filterSector"
          options={sectorOptions}
          value={filterSector}
          onChange={(val: any) => onFilterSectorChange(val)}
          onlyValue
          placeholder="All Sectors"
        />

        <Select
          name="filterStatus"
          options={statusOptions}
          value={filterStatus}
          onChange={(val: any) => onFilterStatusChange(val)}
          onlyValue
          placeholder="All Status"
        />

        <Select
          name="filterLocation"
          options={locationOptions}
          value={filterLocation}
          onChange={(val: any) => onFilterLocationChange(val)}
          onlyValue
          placeholder="All Locations"
        />

        <Select
          name="filterCapacity"
          options={capacityOptions}
          value={filterCapacity}
          onChange={(val: any) => onFilterCapacityChange(val)}
          onlyValue
          placeholder="All Capacity"
        />
      </div>
    </div>
  );
}
