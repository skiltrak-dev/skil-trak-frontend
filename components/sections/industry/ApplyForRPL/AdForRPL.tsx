import React from 'react'
import { useRouter } from 'next/router'

// components
import { Typography, Button, Card } from 'components'

export const AdForRPL = ({ short }: any) => {
  const router = useRouter()
  return (
    <div
      className={`flex ${
        short ? 'flex-col' : 'flex-col lg:flex-row'
      } items-center gap-x-8`}
    >
      {short ? (
        <img
          className="h-36 rounded-lg w-full object-cover"
          src="https://placeimg.com/888/555/any"
          alt="Other"
        />
      ) : (
        <img
          className="h-full rounded-lg"
          src="https://placeimg.com/640/480/any"
          alt="Other"
          width={180}
          height={180}
        />
      )}

      <div className={`w-full h-full flex flex-col items-start gap-y-5`}>
        {!short && (
          <div className="flex flex-col gap-y-2.5">
            <Typography color={'text-gray-700'}>
              Lorem ipsum dolor sit amet. Quo dolore repellat qui culpa
              voluptates est dolor perspiciatis qui voluptatem placeat. Eos
              fugiat internos aut autem vero sed placeat odit aut eaque porro
              qui explicabo voluptas 33 odit asperiores.
            </Typography>

            <Typography color={'text-gray-700'}>
              Vel commodi repellat et repellat error ut minima tenetur id magnam
              iure 33 nisi quisquam At error cumque.
            </Typography>
          </div>
        )}

        {/*  */}
        <div className={`${short && 'mt-2'}`}>
          <Button
            variant={'primary'}
            onClick={() => router.push('/portals/industry/tasks/apply-for-rpl')}
          >
            Apply For RPL
          </Button>
        </div>
      </div>
    </div>
  )
}
