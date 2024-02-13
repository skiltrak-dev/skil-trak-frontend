import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

// Icons
import { IoFilterSharp } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'

// components
import { Card, Typography, Button } from '@components'

// redux
// import { useGetMOUQuery } from "redux/query";

export const Filter = ({
  component,
  setQueryFilters,
  filterInitialValues,
  setFilterAction,
}: any) => {
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState(filterInitialValues)

  useEffect(() => {
    setQueryFilters(filter)
  }, [filter, setQueryFilters])

  // Delay search by 700ms
  const delayedSearch = useCallback(
    debounce((values) => setFilter(values), 700),
    []
  )

  const onFilterChange = (value: any) => {
    delayedSearch(value)
  }

  const onFilterClear = () => {
    setFilter(filterInitialValues)
  }

  const onRemoveFilter = (key: any) => {
    setFilter({ ...filter, [key]: '' })
  }

  const onFilterButtonClick = () => {
    if (visible) {
      onFilterClear()
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  useEffect(() => {
    setFilterAction(
      <Button
        variant={'action'}
        Icon={IoFilterSharp}
        onClick={() => {
          onFilterButtonClick()
        }}
      >
        {visible ? 'Clear' : 'Filter'}
      </Button>
    )
  }, [visible, setFilterAction])

  const Component = component

  return visible ? (
    <Card>
      <Typography variant={'subtitle'}>Filters</Typography>
      <Component onFilterChange={onFilterChange} filter={filter} />
      <div className="flex flex-wrap gap-x-2">
        {Object.keys(filter).map(
          (key) =>
            filter[key] && (
              <div
                key={key}
                className="flex items-center justify-between  border text-xs shadow"
              >
                <div className="mr-2">
                  <span className="px-1 bg-gray-100 text-[11px] capitalize h-full py-0.5 inline-block">
                    {key}:
                  </span>{' '}
                  <span className="font-medium">{filter[key]}</span>
                </div>
                <span
                  onClick={() => onRemoveFilter(key)}
                  className="cursor-pointer text-sm text-gray-300 hover:text-gray-400"
                >
                  <MdCancel />
                </span>
              </div>
            )
        )}
      </div>
    </Card>
  ) : null
}
