export interface KeywordMatch {
    keyword: string
    matchType: 'exact' | 'partial' | 'industry'
    confidence: number
}

// Industry-specific keywords for matching
const INDUSTRY_KEYWORDS = {
    'aged-care': [
        'aged',
        'care',
        'elderly',
        'senior',
        'retirement',
        'nursing',
        'home',
        'residential',
    ],
    construction: [
        'construction',
        'building',
        'civil',
        'engineering',
        'contractor',
        'builder',
        'trades',
    ],
    hospitality: [
        'hotel',
        'restaurant',
        'cafe',
        'bar',
        'hospitality',
        'catering',
        'accommodation',
    ],
    health: [
        'health',
        'medical',
        'hospital',
        'clinic',
        'healthcare',
        'wellness',
        'pharmacy',
    ],
    manufacturing: [
        'manufacturing',
        'factory',
        'production',
        'industrial',
        'warehouse',
        'assembly',
    ],
    education: [
        'school',
        'education',
        'university',
        'college',
        'training',
        'learning',
        'academy',
    ],
    retail: [
        'retail',
        'shop',
        'store',
        'shopping',
        'merchandise',
        'sales',
        'commercial',
    ],
    technology: [
        'technology',
        'tech',
        'software',
        'digital',
        'IT',
        'computing',
        'data',
    ],
}

export const findKeywordMatches = (
    companyName: string,
    address: string,
    selectedSector: string
): KeywordMatch[] => {
    const matches: KeywordMatch[] = []
    const text = `${companyName} ${address}`.toLowerCase()

    // Get keywords for the selected sector
    const sectorKeywords =
        INDUSTRY_KEYWORDS[selectedSector as keyof typeof INDUSTRY_KEYWORDS] ||
        []

    sectorKeywords.forEach((keyword) => {
        const keywordLower = keyword.toLowerCase()

        // Exact match
        if (
            text.includes(` ${keywordLower} `) ||
            text.startsWith(`${keywordLower} `) ||
            text.endsWith(` ${keywordLower}`)
        ) {
            matches.push({
                keyword,
                matchType: 'exact',
                confidence: 1.0,
            })
        }
        // Partial match
        else if (text.includes(keywordLower)) {
            matches.push({
                keyword,
                matchType: 'partial',
                confidence: 0.7,
            })
        }
    })

    // Industry name match
    const sectorName = selectedSector
    if (text.includes(sectorName)) {
        matches.push({
            keyword: sectorName,
            matchType: 'industry',
            confidence: 0.9,
        })
    }

    return matches.sort((a, b) => b.confidence - a.confidence)
}

export const hasSignificantKeywordMatch = (
    matches: KeywordMatch[]
): boolean => {
    return matches.some((match) => match.confidence >= 0.7)
}
