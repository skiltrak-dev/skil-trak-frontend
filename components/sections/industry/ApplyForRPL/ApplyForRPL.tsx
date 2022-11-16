import React, { useEffect } from 'react'

// components
import { Button, BackButton, Card, Typography } from 'components'

// Context
import { useContextBar } from 'hooks'
import { useRouter } from 'next/router'

export const ApplyForRPL = () => {
  const { setContent } = useContextBar()
  const router = useRouter()
  useEffect(() => {
    setContent(null)
  }, [setContent])

  return (
    <div>
      <BackButton link={''} />

      {/*  */}
      <Card>
        <div
          style={{
            backgroundImage: `url(${'https://placeimg.com/640/480/any'})`,
          }}
          className="w-full h-[250px] bg-cover bg-no-repeat bg-center rounded-lg"
        ></div>

        <div className="mt-7 mb-4 flex flex-col gap-y-2.5">
          <Typography variant={'title'}>Instructions</Typography>
          <Typography>
            Lorem ipsum dolor sit amet. Quo dolore repellat qui culpa voluptates
            est dolor perspiciatis qui voluptatem placeat. Eos fugiat internos
            aut autem vero sed placeat odit aut eaque porro qui explicabo
            voluptas 33 odit asperiores.
          </Typography>
          <Typography>
            Vel commodi repellat et repellat error ut minima tenetur id magnam
            iure 33 nisi quisquam At error cumque. Et sequi eligendi sed
            corrupti perferendis in consequatur expedita et enim galisum non
            reiciendis repudiandae qui fugiat dolorum.
          </Typography>
        </div>
        <Button onClick={() => router.push('rpl-form')}>Apply Now</Button>
      </Card>
    </div>
  )
}
