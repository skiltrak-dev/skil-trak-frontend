export const elipiciseText = (text,length) => {
  if (text && text.length > length) return `${text.substring(0, length)} ...`;
  return text;
};