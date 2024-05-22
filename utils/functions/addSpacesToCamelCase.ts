export const addSpacesToCamelCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  };