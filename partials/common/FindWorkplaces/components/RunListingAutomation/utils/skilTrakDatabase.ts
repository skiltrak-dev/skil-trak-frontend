export interface SkilTrakEntry {
  id: string;
  name: string;
  address: string;
  industry: string;
  verified: boolean;
  lastUpdated: string;
}

// Mock SkilTrak database entries
const SKILTRAK_DATABASE: SkilTrakEntry[] = [
  {
    id: 'st-001',
    name: 'Sunset Gardens Care Centre',
    address: '123 Collins Street, Melbourne VIC 3000',
    industry: 'aged-care',
    verified: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'st-002',
    name: 'Melbourne Central Healthcare',
    address: '456 Bourke Street, Melbourne VIC 3000',
    industry: 'health',
    verified: true,
    lastUpdated: '2024-02-20'
  },
  {
    id: 'st-003',
    name: 'Richmond Care Services',
    address: '789 Swan Street, Richmond VIC 3121',
    industry: 'aged-care',
    verified: false,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'st-004',
    name: 'Hawthorn Medical Centre',
    address: '321 Burke Road, Hawthorn VIC 3122',
    industry: 'health',
    verified: true,
    lastUpdated: '2024-03-01'
  },
  {
    id: 'st-005',
    name: 'Prahran Community Services',
    address: '654 Chapel Street, Prahran VIC 3181',
    industry: 'government',
    verified: true,
    lastUpdated: '2024-02-28'
  }
];

interface SkilTrakMatch {
  entry: SkilTrakEntry;
  matchType: 'exact_name' | 'similar_name' | 'exact_address' | 'similar_address';
  similarity: number;
}

const normalizeString = (str: string): string => 
  str.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const calculateStringSimilarity = (str1: string, str2: string): number => {
  const norm1 = normalizeString(str1);
  const norm2 = normalizeString(str2);
  
  if (norm1 === norm2) return 1.0;
  
  const words1 = norm1.split(' ');
  const words2 = norm2.split(' ');
  
  const commonWords = words1.filter(word => 
    words2.some(w2 => w2.includes(word) || word.includes(w2)) && word.length > 2
  );
  
  return commonWords.length / Math.max(words1.length, words2.length);
};

export const checkSkilTrakMatch = (
  companyName: string,
  address: string
): SkilTrakMatch | null => {
  let bestMatch: SkilTrakMatch | null = null;
  let highestSimilarity = 0;
  
  for (const entry of SKILTRAK_DATABASE) {
    const nameSimilarity = calculateStringSimilarity(companyName, entry.name);
    const addressSimilarity = calculateStringSimilarity(address, entry.address);
    
    // Exact name match
    if (nameSimilarity >= 0.9) {
      const match: SkilTrakMatch = {
        entry,
        matchType: nameSimilarity === 1.0 ? 'exact_name' : 'similar_name',
        similarity: nameSimilarity
      };
      
      if (nameSimilarity > highestSimilarity) {
        bestMatch = match;
        highestSimilarity = nameSimilarity;
      }
    }
    
    // Exact address match
    if (addressSimilarity >= 0.9) {
      const match: SkilTrakMatch = {
        entry,
        matchType: addressSimilarity === 1.0 ? 'exact_address' : 'similar_address',
        similarity: addressSimilarity
      };
      
      if (addressSimilarity > highestSimilarity) {
        bestMatch = match;
        highestSimilarity = addressSimilarity;
      }
    }
    
    // Combined match (name + address similarity)
    const combinedScore = (nameSimilarity * 0.6) + (addressSimilarity * 0.4);
    if (combinedScore >= 0.7 && combinedScore > highestSimilarity) {
      bestMatch = {
        entry,
        matchType: nameSimilarity > addressSimilarity ? 'similar_name' : 'similar_address',
        similarity: combinedScore
      };
      highestSimilarity = combinedScore;
    }
  }
  
  return bestMatch;
};

export const getSkilTrakStats = () => ({
  totalEntries: SKILTRAK_DATABASE.length,
  verifiedEntries: SKILTRAK_DATABASE.filter(entry => entry.verified).length,
  industries: [...new Set(SKILTRAK_DATABASE.map(entry => entry.industry))].length
});

export { type SkilTrakMatch };