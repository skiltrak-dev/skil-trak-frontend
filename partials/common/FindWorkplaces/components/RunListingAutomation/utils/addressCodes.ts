interface AddressCode {
  postcode: string;
  suburb: string;
  state: string;
  region: string;
  googlePlaceId?: string;
}

// Mock Google Maps API address code data
const ADDRESS_CODE_MAP: Record<string, AddressCode> = {
  '123 Collins Street, Melbourne VIC': {
    postcode: '3000',
    suburb: 'Melbourne',
    state: 'VIC',
    region: 'Central Melbourne',
    googlePlaceId: 'ChIJ90260rVG1moRkM2MIXVWBAQ'
  },
  '456 Bourke Street, Melbourne VIC': {
    postcode: '3000',
    suburb: 'Melbourne',
    state: 'VIC',
    region: 'Central Melbourne',
    googlePlaceId: 'ChIJ90260rVG1moRkM2MIXVWBAQ'
  },
  '789 Swan Street, Richmond VIC': {
    postcode: '3121',
    suburb: 'Richmond',
    state: 'VIC',
    region: 'Inner Melbourne',
    googlePlaceId: 'ChIJ36ALeJZC1moRgNOPl5jqnJc'
  },
  '321 Burke Road, Hawthorn VIC': {
    postcode: '3122',
    suburb: 'Hawthorn',
    state: 'VIC',
    region: 'Inner East Melbourne',
    googlePlaceId: 'ChIJ-eNLbMNC1moRsFdbrTqG6t0'
  },
  '654 Chapel Street, Prahran VIC': {
    postcode: '3181',
    suburb: 'Prahran',
    state: 'VIC',
    region: 'Inner South Melbourne',
    googlePlaceId: 'ChIJ36fKasFz1moRYqzl_dPu9QM'
  },
  '987 Springvale Road, Springvale VIC': {
    postcode: '3171',
    suburb: 'Springvale',
    state: 'VIC',
    region: 'South East Melbourne',
    googlePlaceId: 'ChIJ_-lKa7F01moRsFdbrTqG6t0'
  }
};

const extractAddressKey = (fullAddress: string): string => {
  // Remove common variations and normalize
  return fullAddress
    .replace(/,?\s*(Australia|AU)$/i, '')
    .replace(/,?\s*\d{4}$/i, '') // Remove existing postcode
    .trim();
};

export const getAddressCode = (address: string): AddressCode | null => {
  // First try exact match
  if (ADDRESS_CODE_MAP[address]) {
    return ADDRESS_CODE_MAP[address];
  }
  
  // Try normalized match
  const normalizedAddress = extractAddressKey(address);
  const matchingKey = Object.keys(ADDRESS_CODE_MAP).find(key => 
    extractAddressKey(key).toLowerCase() === normalizedAddress.toLowerCase()
  );
  
  if (matchingKey) {
    return ADDRESS_CODE_MAP[matchingKey];
  }
  
  // Try partial match for street and suburb
  const matchingPartial = Object.keys(ADDRESS_CODE_MAP).find(key => {
    const keyParts = key.toLowerCase().split(',');
    const addressParts = normalizedAddress.toLowerCase().split(',');
    
    if (keyParts.length >= 2 && addressParts.length >= 2) {
      const streetMatch = keyParts[0].trim().includes(addressParts[0].trim().split(' ').slice(-2).join(' '));
      const suburbMatch = keyParts[1].trim().includes(addressParts[1].trim().split(' ')[0]);
      return streetMatch && suburbMatch;
    }
    return false;
  });
  
  if (matchingPartial) {
    return ADDRESS_CODE_MAP[matchingPartial];
  }
  
  // Return default Melbourne postcode if no match found
  return {
    postcode: '3000',
    suburb: 'Melbourne',
    state: 'VIC',
    region: 'Melbourne Metro',
    googlePlaceId: undefined
  };
};

export const formatAddressWithCode = (address: string): string => {
  const addressCode = getAddressCode(address);
  if (!addressCode) return address;
  
  // Check if address already has postcode
  if (address.match(/\d{4}$/)) {
    return address;
  }
  
  return `${address} ${addressCode.postcode}`;
};

export const getRegionInfo = (address: string): { region: string; postcode: string } => {
  const addressCode = getAddressCode(address);
  return {
    region: addressCode?.region || 'Unknown Region',
    postcode: addressCode?.postcode || '0000'
  };
};

export { type AddressCode };