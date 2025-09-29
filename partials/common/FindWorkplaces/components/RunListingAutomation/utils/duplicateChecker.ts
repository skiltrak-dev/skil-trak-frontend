interface Company {
  id: string;
  name: string;
  address: string;
  type: string;
}

interface ExistingEntry {
  name: string;
  address: string;
}

// Mock existing database entries for duplicate checking
const EXISTING_DATABASE: ExistingEntry[] = [
  {
    name: 'Sunset Gardens Aged Care',
    address: '123 Collins Street, Melbourne VIC'
  },
  {
    name: 'Melbourne Central Care Facility', // Similar name
    address: '456 Bourke Street, Melbourne VIC'
  },
  {
    name: 'Richmond Community Care',
    address: '789 Swan Street, Richmond VIC' // Same address, different name
  },
  {
    name: 'Prahran Community Care Centre',
    address: '654 Chapel Street, Prahran VIC' // Similar name
  }
];

const normalizeString = (str: string): string => 
  str.toLowerCase().replace(/[^\w\s]/g, '').trim();

const getSignificantWords = (text: string, minLength = 3): string[] => 
  normalizeString(text)
    .split(' ')
    .filter(word => word.length >= minLength && !['and', 'the', 'for', 'ltd', 'pty'].includes(word));

const calculateNameSimilarity = (name1: string, name2: string): number => {
  const words1 = getSignificantWords(name1);
  const words2 = getSignificantWords(name2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

const calculateAddressSimilarity = (addr1: string, addr2: string): number => {
  const normalized1 = normalizeString(addr1);
  const normalized2 = normalizeString(addr2);
  
  // Exact match
  if (normalized1 === normalized2) return 1.0;
  
  // Street number and name similarity
  const streetRegex = /(\d+)\s+([^,]+)/;
  const match1 = normalized1.match(streetRegex);
  const match2 = normalized2.match(streetRegex);
  
  if (match1 && match2) {
    const [, num1, street1] = match1;
    const [, num2, street2] = match2;
    
    // Same street number and similar street name
    if (num1 === num2 && street1.includes(street2.split(' ')[0])) {
      return 0.8;
    }
  }
  
  return 0;
};

export const checkForDuplicates = (company: Company): boolean => {
  return EXISTING_DATABASE.some(existing => {
    const nameSimilarity = calculateNameSimilarity(company.name, existing.name);
    const addressSimilarity = calculateAddressSimilarity(company.address, existing.address);
    
    // Consider duplicate if:
    // 1. Exact address match, OR
    // 2. High name similarity (>= 0.6), OR
    // 3. Moderate name similarity (>= 0.4) AND some address similarity (>= 0.5)
    return (
      addressSimilarity >= 1.0 ||
      nameSimilarity >= 0.6 ||
      (nameSimilarity >= 0.4 && addressSimilarity >= 0.5)
    );
  });
};

export const batchCheckDuplicates = (companies: Company[]): Set<string> => {
  const duplicates = new Set<string>();
  
  companies.forEach(company => {
    if (checkForDuplicates(company)) {
      duplicates.add(company.id);
    }
  });
  
  return duplicates;
};

export { type Company, type ExistingEntry };