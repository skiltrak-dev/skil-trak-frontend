import React, { useState, useEffect } from 'react'

export const useGetSectors = (data: any) => {
  const [sectors, setSectors] = useState<any[] | null>([])
  useEffect(() => {
    if (data.data && data.isSuccess) {
      let newSectors: any[] = []
      data.data?.map((sector: any) => {
        const findIndex = newSectors.findIndex(
          (data) => data.name === sector?.sector?.name
        )
        if (
          newSectors.map((data) => data.name).includes(sector?.sector?.name)
        ) {
          newSectors[findIndex] = {
            ...newSectors[findIndex],
            courses: [
              ...newSectors[findIndex].courses,
              {
                id: sector?.id,
                name: sector?.title,
                code: sector?.code,
              },
            ],
          }
        } else {
          newSectors = [
            ...newSectors,
            {
              id: sector?.sector?.id,
              name: sector?.sector?.name,
              courses: [
                {
                  id: sector?.id,
                  name: sector?.title,
                  title: sector?.title,
                  code: sector?.code,
                },
              ],
            },
          ]
        }
      })
      setSectors(newSectors)
    }
  }, [data.data, data.isSuccess, setSectors])
  return sectors
}
