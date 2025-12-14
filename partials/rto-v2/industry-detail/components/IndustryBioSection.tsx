import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Edit2, Save, X, Building } from 'lucide-react'

export function IndustryBioSection() {
    const [isEditing, setIsEditing] = useState(false)
    const [bio, setBio] = useState(
        'TechCorp Solutions is a leading technology company specializing in innovative software development and IT consulting services. With over 15 years of industry experience, we pride ourselves on delivering cutting-edge solutions to our clients across Australia. Our team of expert professionals is dedicated to fostering a collaborative learning environment, making us an ideal partner for student placements and professional development programs. We offer comprehensive mentorship, hands-on experience with the latest technologies, and a supportive workplace culture that encourages growth and innovation.'
    )

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
            <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-2.5 flex items-center justify-between">
                <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                    <FileText className="w-3 h-3" />
                    Industry Biography
                </h3>
                {!isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsEditing(true)}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <Edit2 className="w-3 h-3" />
                    </motion.button>
                )}
            </div>

            <div className="p-2.5">
                {isEditing ? (
                    <div className="space-y-2">
                        <label className="text-[9px] font-medium text-[#64748B] mb-1 block">
                            Company Biography
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={8}
                            className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 resize-none leading-relaxed"
                            placeholder="Describe your industry, values, culture, and what makes you a great placement partner..."
                        />
                        <div className="text-[9px] text-[#64748B] flex items-center justify-between">
                            <span>{bio.length} characters</span>
                            <span>Maximum 1000 characters recommended</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsEditing(false)}
                                className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-lg text-[9px] font-medium hover:shadow-md transition-all"
                            >
                                <Save className="w-2.5 h-2.5" />
                                Save Changes
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsEditing(false)}
                                className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-[9px] font-medium transition-all"
                            >
                                <X className="w-2.5 h-2.5" />
                                Cancel
                            </motion.button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/20">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Building className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] leading-relaxed text-[#1A2332]">
                                    {bio}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#64748B]">
                            <FileText className="w-2.5 h-2.5" />
                            <span>
                                Last updated:{' '}
                                {new Date().toLocaleDateString('en-AU', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
