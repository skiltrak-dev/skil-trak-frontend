
export const checkListLength = (data:any) => {
  return data?.length && data?.length > 4
  ? [data?.length - 1, data?.length - 2]
  : data?.length > 3
  ?  [data?.length - 1]
  :  []
}
