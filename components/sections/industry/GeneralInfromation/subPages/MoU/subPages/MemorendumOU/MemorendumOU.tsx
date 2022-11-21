import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { SelectRtoData } from "../../MoU";

// Icons
import { MdSimCardDownload } from 'react-icons/md'

// components
import {
  Card,
  ActionAlert,
  Button,
  Typography,
  BackButton,
  // TechnicalError,
} from 'components'
import { MouEditor, Signature } from './components'

// redux
import {
  useMouMutation,
  useGetDefaultMouContentQuery,
  useGetIndustryMOUDetailQuery,
  useAcceptSignRequestMutation,
} from '@queries'
import { AuthUtils, getUserCredentials } from '@utils'
import { LoadingAnimation } from '@components'

// context
// import { useNotification } from "hooks";

export const MemorendumOU = () => {
  // const contextData = useContext(SelectRtoData);
  const router = useRouter()
  const id = router.query.mouId
  const [editMou, setEditMou] = useState<boolean | null>(false)
  const [content, setContent] = useState<any | null>(null)
  const [saveContentButton, setSaveContentButton] = useState<any | null>(null)

  // const { notification } = useNotification();

  // redux query
  const getMou = useGetIndustryMOUDetailQuery(id)
  const [createMou, createMouResult] = useMouMutation()
  const [acceptMou, acceptMouData] = useAcceptSignRequestMutation()
  const defaultMou = useGetDefaultMouContentQuery(null, {
    skip: getMou?.data,
  })
  // const mouDetail = useGetMOUDetailQuery();

  // using ref
  const [sigPad, setSigPad] = useState({})

  useEffect(() => {
    if (!getMou?.data) {
      setContent(defaultMou?.data?.content)
    }
  }, [getMou.data, defaultMou.data])

  useEffect(() => {
    if (getMou?.data) {
      setContent(getMou?.data?.content)
    }
  }, [getMou.data])

  useEffect(() => {
    if (createMouResult.isSuccess || acceptMouData.isSuccess) {
      setTimeout(() => {
        router.push('/general-information/mou')
      }, 1500)
    }
  }, [createMouResult.isSuccess, acceptMouData.isSuccess, router])

  useEffect(() => {
    if (getMou?.data?.status === 'cencelled') {
      router.push('/general-information/mou')
    }
  }, [getMou, router])

  const saveContent = (content: any) => {
    setContent(content)
  }

  const onSubmit = async () => {
    var dataURL = sigPad?.toDataURL('image/svg+xml')
    if (!sigPad?.isEmpty()) {
      if (getMou.data) {
        await acceptMou({
          IndustrySignature: dataURL,
          id,
        })
      } else {
        // Create Mou
        await createMou({
          industrySignature: dataURL,
          content: JSON.stringify(content),
          rto: id,
        })
      }
    } else {
      // notification.error({
      //   title: "Please Sign Mou",
      //   description: "Some description for notification",
      // });
    }
  }

  const IndustryName = getUserCredentials()

  let replacedContent = content?.replace(/\\n/g, '<br/>')
  if (getMou.data) {
    replacedContent = replacedContent?.slice(1, -1)
  }
  // replacedContent = replacedContent?.replace("<p></p>", "<br/>");

  const loading = getMou.isLoading || defaultMou.isLoading
  const isError = getMou.isError || defaultMou.isError

  return (
    <>
      <BackButton text={"Back To MoU's"} />

      {createMouResult.isSuccess || acceptMouData.isSuccess ? (
        <Card>
          <ActionAlert
            title={`Successfully partnered up with ${getMou?.data?.rto?.user?.name}`}
            description={'You will be redirected to MOU in a moment.'}
          />
        </Card>
      ) : (
        <Card>
          {isError && 'Error'}
          {!loading ? (
            <div className={`${isError ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center ">
                <Typography variant={'h4'}>Memorendum Ou</Typography>

                <div className="flex justify-end items-center gap-x-4">
                  {!editMou ? (
                    <>
                      {getMou?.data?.status !== 'signed' && (
                        <Button
                          variant={'secondary'}
                          text={'Edit'}
                          onClick={() => setEditMou(true)}
                        />
                      )}
                      {getMou?.data?.status === 'signed' && (
                        <a
                          href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant={'action'}
                            Icon={MdSimCardDownload}
                            submit
                          >
                            Download
                          </Button>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditMou(false)}
                        variant={'secondary'}
                        text={'Cancel'}
                      />
                      {saveContentButton}
                    </>
                  )}
                </div>
              </div>

              {/* Data */}
              <div className="mt-6">
                {editMou ? (
                  <>
                    {/* <MouEditor
                      content={content}
                      saveContent={saveContent}
                      setEditMou={setEditMou}
                      setSaveContentButton={setSaveContentButton}
                    /> */}
                  </>
                ) : (
                  <>
                    <div className="flex justify-end w-full"></div>

                    {getMou.isSuccess && (
                      <div
                        className="my-4"
                        dangerouslySetInnerHTML={{
                          __html: replacedContent,
                        }}
                      />
                    )}
                  </>
                )}

                {/* Signature */}
                <div className="flex items-start gap-x-3">
                  {getMou.data && (
                    <div className="my-5 w-full max-w-[50%]">
                      <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                        <img
                          className="object-cover p-5"
                          src={getMou.data.rtoSignature}
                          alt=""
                        />
                      </div>
                      <Typography variant={'label'}>
                        {getMou?.data?.rto?.user?.name || 'RTO'}
                      </Typography>
                    </div>
                  )}
                  {getMou?.data?.industrySignature ? (
                    <div className="my-5 w-full max-w-[50%]">
                      <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                        <img
                          className="object-cover p-5"
                          src={getMou.data.industrySignature}
                          alt=""
                        />
                      </div>
                      <Typography variant={'label'}>
                        {IndustryName?.name}
                      </Typography>
                    </div>
                  ) : (
                    <Signature
                      sigPad={sigPad}
                      setSigPad={setSigPad}
                      industryName={IndustryName?.name}
                    />
                  )}
                </div>

                {/* Action */}
                {getMou?.data?.status !== 'signed' && (
                  <Button
                    onClick={onSubmit}
                    loading={
                      acceptMouData.isLoading || createMouResult.isLoading
                    }
                    disabled={
                      acceptMouData.isLoading || createMouResult.isLoading
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </Card>
      )}
    </>
  )
}
