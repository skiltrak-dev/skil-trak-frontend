export const filterify = (filter: any) => {
   return Object.keys(filter)
      .map((key) =>
         (filter as any)[key]
            ? `${encodeURIComponent(key)}:${encodeURIComponent(
                 (filter as any)[key]
              )}`
            : null
      )
      .join(',')
}
