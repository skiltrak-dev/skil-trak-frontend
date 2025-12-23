import { useState } from "react";
import {
    Building2,
    Upload,
    X,
    Plus,
    FileSpreadsheet,
    UserPlus,
    MapPin,
    Phone,
    Mail,
    Globe,
    Users,
    CheckCircle2,
    AlertCircle,
    Download,
    FileText,
    Sparkles,
    BookOpen,
    GraduationCap,
    Trash2,
} from "lucide-react";
import { useNotification } from "../../../../hooks/useNotification";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/buttons";
import { TextInput as Input, TextArea, Select } from "../../../../components/inputs";
import { Badge } from "../../../../components/Badge/Badge";
import { Card } from "../../../../components/cards";

interface AddIndustryDialogProps {
    open: boolean;
    onClose: () => void;
}

interface Course {
    id: string;
    name: string;
    code: string;
    capacity: string;
}

const sectorOptions = [
    { label: "Community Services", value: "Community Services" },
    { label: "IT & Digital", value: "IT & Digital" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Construction", value: "Construction" },
    { label: "Education", value: "Education" },
    { label: "Retail", value: "Retail" },
    { label: "Other", value: "Other" },
];

export const AddIndustryDialog = ({ open, onClose }: AddIndustryDialogProps) => {
    const { notification } = useNotification();
    const [activeTab, setActiveTab] = useState("single");
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [bulkText, setBulkText] = useState("");
    const [showValidation, setShowValidation] = useState(false);
    const [validationResults, setValidationResults] = useState<{
        valid: Array<{ name: string; abn: string; status: string }>;
        conflicts: Array<{ name: string; abn: string; conflictType: string; reason: string }>;
    }>({
        valid: [],
        conflicts: [],
    });

    // Courses state
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState({ name: "", code: "", capacity: "" });

    // Bulk import courses state
    const [bulkSector, setBulkSector] = useState("");
    const [bulkCourses, setBulkCourses] = useState<Course[]>([]);
    const [currentBulkCourse, setCurrentBulkCourse] = useState({ name: "", code: "", capacity: "" });

    // Single industry form state
    const [formData, setFormData] = useState({
        name: "",
        abn: "",
        sector: "",
        location: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        capacity: "",
        website: "",
        facilities: "",
        notes: "",
    });

    // Course management functions
    const handleAddCourse = () => {
        if (currentCourse.name && currentCourse.code && currentCourse.capacity) {
            setCourses([...courses, { ...currentCourse, id: Date.now().toString() }]);
            setCurrentCourse({ name: "", code: "", capacity: "" });
            notification.success({ title: "Course added successfully", description: "The course has been added to the list." });
        }
    };

    const handleRemoveCourse = (id: string) => {
        setCourses(courses.filter(course => course.id !== id));
        notification.success({ title: "Course removed", description: "The course has been removed from the list." });
    };

    // Bulk course management functions
    const handleAddBulkCourse = () => {
        if (currentBulkCourse.name && currentBulkCourse.code && currentBulkCourse.capacity) {
            setBulkCourses([...bulkCourses, { ...currentBulkCourse, id: Date.now().toString() }]);
            setCurrentBulkCourse({ name: "", code: "", capacity: "" });
            notification.success({ title: "Course added successfully", description: "The course has been added to the list." });
        }
    };

    const handleRemoveBulkCourse = (id: string) => {
        setBulkCourses(bulkCourses.filter(course => course.id !== id));
        notification.success({ title: "Course removed", description: "The course has been removed from the list." });
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleSubmitSingle = () => {
        // Handle single industry submission
        console.log("Single industry data:", formData);
        console.log("Courses:", courses);

        // Show success message
        const courseCount = courses.length;
        if (courseCount > 0) {
            notification.success({
                title: `Industry partner added successfully!`,
                description: `${formData.name} added with ${courseCount} course${courseCount > 1 ? 's' : ''}`,
            });
        } else {
            notification.success({
                title: `Industry partner added successfully!`,
                description: formData.name,
            });
        }

        onClose();
    };

    const handleSubmitBulk = () => {
        // Simulate validation
        const mockValidation = {
            valid: [
                { name: "Sunshine Aged Care", abn: "12 345 678 901", status: "Ready to import" },
                { name: "Harmony Services", abn: "23 456 789 012", status: "Ready to import" },
            ],
            conflicts: [
                {
                    name: "Metro Care Services",
                    abn: "34 567 890 123",
                    conflictType: "Other RTO",
                    reason: "Already partnered with Sydney RTO"
                },
                {
                    name: "Global Healthcare Network",
                    abn: "45 678 901 234",
                    conflictType: "SkilTrak",
                    reason: "Belongs to SkilTrak global directory"
                },
            ],
        };

        setValidationResults(mockValidation);
        setShowValidation(true);
    };

    const downloadTemplate = () => {
        // Create CSV template
        const csvContent = "Name,ABN,Sector,Location,Contact Person,Contact Email,Contact Phone,Capacity,Website,Facilities\n" +
            "Example Aged Care,12 345 678 901,Community Services,Melbourne VIC,John Smith,john@example.com.au,(03) 1234 5678,15,https://example.com.au,Aged Care|Disability Support\n";

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'industry-partners-template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-xl blur-md opacity-40"></div>
                            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-premium">
                                <Building2 className="h-6 w-6 text-white" />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/0 to-white/20"></div>
                            </div>
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Add Industry Partner</DialogTitle>
                            <DialogDescription className="mt-1">
                                Add one partner or import multiple at once
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4">
                    <div className="grid grid-cols-2 h-11 w-full bg-muted rounded-lg p-1 gap-1">
                        <div
                            className={`flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all cursor-pointer ${activeTab === "single" ? "bg-white text-black shadow-sm" : "hover:bg-background/50 text-muted-foreground"}`}
                            onClick={() => setActiveTab("single")}
                        >
                            <UserPlus className="h-4 w-4" />
                            Single Partner
                        </div>
                        <div
                            className={`flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all cursor-pointer ${activeTab === "bulk" ? "bg-white text-black shadow-sm" : "hover:bg-background/50 text-muted-foreground"}`}
                            onClick={() => setActiveTab("bulk")}
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Bulk Import
                        </div>
                    </div>

                    {/* Single Partner Tab */}
                    {activeTab === "single" && (
                        <div className="space-y-4 mt-4 animate-in fade-in-50 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Industry Name */}
                                <div className="md:col-span-2">
                                    <Input
                                        name="name"
                                        label="Industry Name *"
                                        placeholder="e.g., Sunshine Aged Care"
                                        value={formData.name}
                                        onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                {/* ABN Number */}
                                <div>
                                    <Input
                                        name="abn"
                                        label="ABN Number"
                                        placeholder="e.g., 12 345 678 901"
                                        value={formData.abn}
                                        onChange={(e: any) => setFormData({ ...formData, abn: e.target.value })}
                                    />
                                </div>

                                {/* Sector */}
                                <div>
                                    <Select
                                        name="sector"
                                        label="Sector *"
                                        options={sectorOptions}
                                        value={formData.sector}
                                        onChange={(val: any) => setFormData({ ...formData, sector: val })}
                                        onlyValue
                                        placeholder="Select sector"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <Input
                                        name="location"
                                        label="Location *"
                                        placeholder="e.g., Melbourne, VIC"
                                        value={formData.location}
                                        onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                {/* Contact Person */}
                                <div>
                                    <Input
                                        name="contactPerson"
                                        label="Contact Person *"
                                        placeholder="e.g., Sarah Johnson"
                                        value={formData.contactPerson}
                                        onChange={(e: any) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    />
                                </div>

                                {/* Contact Email */}
                                <div>
                                    <Input
                                        name="contactEmail"
                                        type="email"
                                        label="Contact Email *"
                                        placeholder="e.g., sarah@example.com.au"
                                        value={formData.contactEmail}
                                        onChange={(e: any) => setFormData({ ...formData, contactEmail: e.target.value })}
                                    />
                                </div>

                                {/* Contact Phone */}
                                <div>
                                    <Input
                                        name="contactPhone"
                                        label="Contact Phone"
                                        placeholder="e.g., (03) 9876 5432"
                                        value={formData.contactPhone}
                                        onChange={(e: any) => setFormData({ ...formData, contactPhone: e.target.value })}
                                    />
                                </div>

                                {/* Capacity */}
                                <div>
                                    <Input
                                        name="capacity"
                                        type="number"
                                        label="Placement Capacity *"
                                        placeholder="e.g., 15"
                                        value={formData.capacity}
                                        onChange={(e: any) => setFormData({ ...formData, capacity: e.target.value })}
                                    />
                                </div>

                                {/* Website */}
                                <div className="md:col-span-2">
                                    <Input
                                        name="website"
                                        type="url"
                                        label="Website"
                                        placeholder="e.g., https://example.com.au"
                                        value={formData.website}
                                        onChange={(e: any) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>

                                {/* Facilities */}
                                <div className="md:col-span-2">
                                    <Input
                                        name="facilities"
                                        label="Facilities/Services"
                                        placeholder="e.g., Aged Care, Disability Support, Dementia Care (separate with commas)"
                                        value={formData.facilities}
                                        onChange={(e: any) => setFormData({ ...formData, facilities: e.target.value })}
                                        helpText="Separate multiple facilities with commas"
                                    />
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <TextArea
                                        name="notes"
                                        label="Additional Notes"
                                        placeholder="Any additional information about this industry partner..."
                                        value={formData.notes}
                                        onChange={(e: any) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* Courses Section - Shows when sector is selected */}
                            {formData.sector && (
                                <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-md animate-in fade-in-50 duration-500">
                                    <div className="p-5 space-y-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-lg blur-md opacity-40"></div>
                                                <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-md">
                                                    <GraduationCap className="h-5 w-5 text-white" />
                                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/0 to-white/20"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Courses for {formData.sector}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                    Add courses that this industry partner can support for placements
                                                </p>
                                            </div>
                                        </div>

                                        {/* Add Course Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg bg-muted/40 border border-border items-end">
                                            <div>
                                                <Input
                                                    name="courseName"
                                                    label="Course Name"
                                                    placeholder="e.g., Cert III"
                                                    value={currentCourse.name}
                                                    onChange={(e: any) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    name="courseCode"
                                                    label="Course Code"
                                                    placeholder="e.g., CHC3"
                                                    value={currentCourse.code}
                                                    onChange={(e: any) => setCurrentCourse({ ...currentCourse, code: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex gap-2 items-end">
                                                <div className="flex-1">
                                                    <Input
                                                        name="courseCapacity"
                                                        type="number"
                                                        label="Capacity"
                                                        placeholder="Qty"
                                                        value={currentCourse.capacity}
                                                        onChange={(e: any) => setCurrentCourse({ ...currentCourse, capacity: e.target.value })}
                                                    />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={handleAddCourse}
                                                    disabled={!currentCourse.name || !currentCourse.code || !currentCourse.capacity}
                                                    className="gap-1.5 bg-gradient-to-r from-secondary to-primary px-3 h-[42px] mb-0"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Add
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Added Courses List */}
                                        {courses.length > 0 && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold">Added Courses ({courses.length})</p>
                                                    <Badge variant="muted" outline className="gap-1">
                                                        <GraduationCap className="h-3 w-3" />
                                                        Total Capacity: {courses.reduce((sum, c) => sum + parseInt(c.capacity || "0"), 0)}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                                    {courses.map((course) => (
                                                        <div
                                                            key={course.id}
                                                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-success/5 to-emerald-50/50 border border-success/20 group hover:border-success/40 transition-all"
                                                        >
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <GraduationCap className="h-4 w-4 text-success flex-shrink-0" />
                                                                    <div>
                                                                        <p className="text-sm font-semibold">{course.name}</p>
                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                            <Badge variant="muted" outline className="text-xs h-5 px-1.5">
                                                                                {course.code}
                                                                            </Badge>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                Capacity: {course.capacity} students
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="action"
                                                                mini
                                                                onClick={() => handleRemoveBulkCourse(course.id)}
                                                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {courses.length === 0 && (
                                            <div className="text-center py-6 px-4 rounded-lg bg-muted/30 border border-dashed border-border">
                                                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3">
                                                    <BookOpen className="h-6 w-6 text-primary" />
                                                </div>
                                                <p className="text-sm font-semibold mb-1">No courses added yet</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Add courses using the form above to specify placement capacities
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t">
                                <p className="text-xs text-muted-foreground">* Required fields</p>
                                <div className="flex gap-2">
                                    <Button outline onClick={onClose} text="Cancel" />
                                    <Button
                                        onClick={handleSubmitSingle}
                                        className="bg-gradient-to-r from-secondary to-primary gap-2"
                                        disabled={
                                            !formData.name ||
                                            !formData.sector ||
                                            !formData.location ||
                                            !formData.contactPerson ||
                                            !formData.contactEmail ||
                                            !formData.capacity
                                        }
                                        text="Add Industry Partner"
                                        Icon={Plus}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bulk Import Tab */}
                    {activeTab === "bulk" && (
                        <div className="space-y-4 mt-4 animate-in fade-in-50 duration-300">
                            {/* File Upload Method */}
                            <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all hover-lift">
                                <div className="p-5">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md">
                                            <Upload className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Upload File</h4>
                                            <p className="text-xs text-muted-foreground">
                                                Upload CSV or Excel file with industry data
                                            </p>
                                        </div>
                                    </div>

                                    {/* File Upload Area */}
                                    <div
                                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragActive
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept=".csv,.xlsx,.xls"
                                            onChange={handleFileChange}
                                        />

                                        {uploadedFile ? (
                                            <div className="space-y-3">
                                                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-500 flex items-center justify-center shadow-md">
                                                    <CheckCircle2 className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm mb-1">{uploadedFile.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {(uploadedFile.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                                <Button
                                                    outline
                                                    size="sm"
                                                    onClick={() => setUploadedFile(null)}
                                                    className="gap-2"
                                                    text="Remove"
                                                    Icon={X}
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold mb-1">
                                                        Drag & drop your file here
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mb-3">
                                                        or click to browse
                                                    </p>
                                                </div>
                                                <Button
                                                    outline
                                                    size="sm"
                                                    onClick={() => document.getElementById("file-upload")?.click()}
                                                    className="gap-2"
                                                    text="Choose File"
                                                    Icon={Upload}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <Badge variant="muted" outline text="CSV" size="xs" />
                                        <Badge variant="muted" outline text="XLSX" size="xs" />
                                        <Badge variant="muted" outline text="XLS" size="xs" />
                                    </div>
                                </div>
                            </Card>

                            {/* Template Download */}
                            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                                <div className="p-4">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                                                <Download className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">Need a template?</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Download our CSV template with example data
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            outline
                                            size="sm"
                                            onClick={downloadTemplate}
                                            className="gap-2 border-primary/30 hover:bg-primary/5"
                                            text="Download Template"
                                            Icon={Download}
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Required Format Info */}
                            <Card className="border-border/60">
                                <div className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5">
                                            <AlertCircle className="h-4 w-4 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold mb-2">Required Columns</p>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Name (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Sector (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Location (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Contact Person (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Contact Email (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                    <span>Capacity (required)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                                                    <span>ABN (optional)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                                                    <span>Contact Phone (optional)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                                                    <span>Website (optional)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                                                    <span>Facilities (optional)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Validation Results */}
                            {showValidation && (
                                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <FileSpreadsheet className="h-5 w-5 text-primary" />
                                            <h4 className="font-semibold">Validation Results</h4>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Valid Industries */}
                                            {validationResults.valid.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle2 className="h-4 w-4 text-success" />
                                                        <p className="text-sm font-semibold">Valid Industries ({validationResults.valid.length})</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {validationResults.valid.map((item, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                                                                <div>
                                                                    <p className="text-sm font-semibold">{item.name}</p>
                                                                    <p className="text-xs text-muted-foreground">ABN: {item.abn}</p>
                                                                </div>
                                                                <Badge className="bg-success/10 text-success border-success/20 gap-1">{item.status}</Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Conflicts */}
                                            {validationResults.conflicts.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <AlertCircle className="h-4 w-4 text-warning" />
                                                        <p className="text-sm font-semibold">Conflicts Detected ({validationResults.conflicts.length})</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {validationResults.conflicts.map((item, idx) => (
                                                            <div key={idx} className={`p-3 rounded-lg border ${item.conflictType === "Other RTO"
                                                                ? "bg-destructive/5 border-destructive/20"
                                                                : "bg-warning/5 border-warning/20"
                                                                }`}>
                                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-semibold">{item.name}</p>
                                                                        <p className="text-xs text-muted-foreground">ABN: {item.abn}</p>
                                                                    </div>
                                                                    <Badge className={
                                                                        item.conflictType === "Other RTO"
                                                                            ? "bg-destructive/10 text-destructive border-destructive/20"
                                                                            : "bg-warning/10 text-warning border-warning/20"
                                                                    } text={item.conflictType} />
                                                                </div>
                                                                <p className="text-xs text-muted-foreground mb-2">{item.reason}</p>
                                                                <Button mini
                                                                    variant="secondary"
                                                                    text="Resolve Conflict"
                                                                    Icon={AlertCircle}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sector & Courses Selection for Bulk Import */}
                                        <div className="mt-4 space-y-4">
                                            <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 border border-primary/20">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sparkles className="h-4 w-4 text-secondary" />
                                                    <h4 className="text-sm font-semibold">Select Sector for Imported Industries</h4>
                                                </div>
                                                <Select
                                                    value={bulkSector}
                                                    onChange={(value: any) => setBulkSector(value)}
                                                    options={sectorOptions}
                                                    onlyValue
                                                    placeholder="Select sector for all industries"
                                                />
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    This sector will be assigned to all {validationResults.valid.length} industries being imported
                                                </p>
                                            </div>

                                            {/* Bulk Courses Section */}
                                            {bulkSector && (
                                                <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-md animate-in fade-in-50 duration-500">
                                                    <div className="p-5 space-y-4">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-lg blur-md opacity-40"></div>
                                                                <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-md">
                                                                    <GraduationCap className="h-5 w-5 text-white" />
                                                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/0 to-white/20"></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold">Courses for {bulkSector}</h4>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Add courses that all imported industries can support for placements
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Add Bulk Course Form */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg bg-muted/40 border border-border items-end">
                                                            <div>
                                                                <Input
                                                                    name="bulkCourseName"
                                                                    label="Course Name"
                                                                    placeholder="e.g., Cert III"
                                                                    value={currentBulkCourse.name}
                                                                    onChange={(e: any) => setCurrentBulkCourse({ ...currentBulkCourse, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Input
                                                                    name="bulkCourseCode"
                                                                    label="Course Code"
                                                                    placeholder="e.g., CHC3"
                                                                    value={currentBulkCourse.code}
                                                                    onChange={(e: any) => setCurrentBulkCourse({ ...currentBulkCourse, code: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 items-end">
                                                                <div className="flex-1">
                                                                    <Input
                                                                        name="bulkCourseCapacity"
                                                                        type="number"
                                                                        label="Capacity"
                                                                        placeholder="Qty"
                                                                        value={currentBulkCourse.capacity}
                                                                        onChange={(e: any) => setCurrentBulkCourse({ ...currentBulkCourse, capacity: e.target.value })}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={handleAddBulkCourse}
                                                                    disabled={!currentBulkCourse.name || !currentBulkCourse.code || !currentBulkCourse.capacity}
                                                                    className="gap-1.5 bg-gradient-to-r from-secondary to-primary px-3 h-[42px] mb-0"
                                                                >
                                                                    <Plus className="h-3.5 w-3.5" />
                                                                    Add
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {/* Added Bulk Courses List */}
                                                        {bulkCourses.length > 0 && (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm font-semibold">Added Courses ({bulkCourses.length})</p>
                                                                    <Badge variant="muted" outline className="gap-1">
                                                                        <GraduationCap className="h-3 w-3" />
                                                                        Total Capacity: {bulkCourses.reduce((sum, c) => sum + parseInt(c.capacity || "0"), 0)}
                                                                    </Badge>
                                                                </div>
                                                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                                                    {bulkCourses.map((course) => (
                                                                        <div
                                                                            key={course.id}
                                                                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-success/5 to-emerald-50/50 border border-success/20 group hover:border-success/40 transition-all"
                                                                        >
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <GraduationCap className="h-4 w-4 text-success flex-shrink-0" />
                                                                                    <div>
                                                                                        <p className="text-sm font-semibold">{course.name}</p>
                                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                                            <Badge variant="muted" outline className="text-xs h-5 px-1.5">
                                                                                                {course.code}
                                                                                            </Badge>
                                                                                            <span className="text-xs text-muted-foreground">
                                                                                                Capacity: {course.capacity} students
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="action"
                                                                                mini
                                                                                onClick={() => handleRemoveBulkCourse(course.id)}
                                                                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                                                                            >
                                                                                <Trash2 className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {bulkCourses.length === 0 && (
                                                            <div className="text-center py-6 px-4 rounded-lg bg-muted/30 border border-dashed border-border">
                                                                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3">
                                                                    <BookOpen className="h-6 w-6 text-primary" />
                                                                </div>
                                                                <p className="text-sm font-semibold mb-1">No courses added yet</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Add courses that will be assigned to all imported industries
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Card>
                                            )}

                                            {/* Summary */}
                                            <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Ready to import:</span>
                                                    <span className="font-semibold text-success">{validationResults.valid.length} industries</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm mt-1">
                                                    <span className="text-muted-foreground">Require resolution:</span>
                                                    <span className="font-semibold text-warning">{validationResults.conflicts.length} conflicts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <div className="flex items-center justify-end gap-2 pt-4 border-t">
                                <Button outline onClick={onClose} text="Cancel" />
                                {!showValidation ? (
                                    <Button
                                        onClick={handleSubmitBulk}
                                        className="bg-gradient-to-r from-secondary to-primary gap-2"
                                        disabled={!uploadedFile}
                                        text="Validate & Continue"
                                        Icon={FileSpreadsheet}
                                    />
                                ) : (
                                    <Button
                                        onClick={() => {
                                            console.log("Importing valid industries:", validationResults.valid);
                                            console.log("Bulk Sector:", bulkSector);
                                            console.log("Bulk Courses:", bulkCourses);

                                            const courseCount = bulkCourses.length;
                                            const industryCount = validationResults.valid.length;

                                            if (courseCount > 0 && bulkSector) {
                                                notification.success({
                                                    title: `Successfully imported ${industryCount} industries with ${courseCount} course${courseCount > 1 ? 's' : ''}`,
                                                    description: `All industries assigned to ${bulkSector} sector`,
                                                });
                                            } else {
                                                notification.success({
                                                    title: `Successfully imported ${industryCount} industries`,
                                                    description: validationResults.conflicts.length > 0
                                                        ? `${validationResults.conflicts.length} conflicts require resolution`
                                                        : "All industries added successfully",
                                                });
                                            }

                                            if (validationResults.conflicts.length > 0) {
                                                setTimeout(() => {
                                                    notification.info({
                                                        title: "Conflict Resolution Required",
                                                        description: "Check the Pending Review tab for industries needing approval",
                                                    });
                                                }, 2000);
                                            }
                                            onClose();
                                        }}
                                        className="bg-gradient-to-r from-success to-emerald-500 gap-2"
                                        disabled={validationResults.valid.length === 0}
                                        text={`Import ${validationResults.valid.length} Industries`}
                                        Icon={Upload}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};