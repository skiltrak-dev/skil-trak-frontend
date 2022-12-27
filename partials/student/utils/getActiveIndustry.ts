export const getActiveIndustry = (workplace: any) => {
  const placementStarted = workplace?.find(
      (wp: any) => wp.currentStatus === 'placementStarted'
  )

  if (placementStarted) {
      const workIndustry = placementStarted?.industries?.find(
          (p: any) => p.applied
      )
      return workIndustry?.industry
  }
  return null
}
