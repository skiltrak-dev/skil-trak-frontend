import { SiteLayout } from '@layouts'
import Image from 'next/image'
import React, { ReactElement } from 'react'

const EmailTemplate = () => {
    const studentName = 'John Doe'

    const workplaceInfo = [
        { label: 'Workplace Name', value: 'Workplace Name Here' },
        { label: 'Workplace Address', value: 'Address Here' },
        { label: 'Contact Person', value: 'Contact Name Here' },
    ]

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

    const timeslots = [
        { startTime: '2pm', endTime: '1pm' },
        { startTime: '2pm', endTime: '1pm' },
        { startTime: '2pm', endTime: '1pm' },
        { startTime: '2pm', endTime: '1pm' },
        { startTime: '2pm', endTime: '1pm' },
        { offDay: true },
        { offDay: true },
    ]
    return (
        <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            width="100%"
            style={{
                maxWidth: '552px',
                margin: '40px auto',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 0px 40px 0px rgba(0,0,0,0.25)',
            }}
        >
            <tbody>
                <tr>
                    <td
                        align="center"
                        style={{ paddingTop: '28px', paddingBottom: '20px' }}
                    >
                        <img
                            src="/images/site/logo-light.webp"
                            alt="Skiltrak 2.0 Logo"
                            width="128"
                            style={{ display: 'block' }}
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        align="center"
                        style={{
                            padding: '14px 0',
                            borderTop: '2px solid #F7910F',
                            borderBottom: '2px solid #F7910F',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                        >
                            eligible workplace option for placement
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: '24px 20px' }}>
                        <table
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                        >
                            <tbody>
                                <tr>
                                    <td
                                        align="center"
                                        style={{ paddingBottom: '8px' }}
                                    >
                                        <h4
                                            style={{
                                                margin: 0,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Dear {studentName},
                                        </h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        align="center"
                                        style={{ paddingBottom: '8px' }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: '18px',
                                                lineHeight: '29px',
                                                color: '#24556D',
                                            }}
                                        >
                                            We are excited to inform you that
                                            Skiltrak has successfully found a
                                            matching industry in your area of
                                            interest.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: '18px',
                                                lineHeight: '29px',
                                                color: '#24556D',
                                            }}
                                        >
                                            Please review all details of the
                                            workplace below & approve your
                                            request to continue the placement
                                            process.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style={{ paddingBottom: '16px' }}>
                        <h4
                            style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Workplace Information
                        </h4>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: '0 8px' }}>
                        <table
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                        >
                            <tbody>
                                {workplaceInfo.map((info, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td
                                                width="30%"
                                                style={{
                                                    backgroundColor:
                                                        'rgba(247, 145, 15, 0.15)',
                                                    padding: '18px 16px',
                                                    fontSize: '14px',
                                                    borderTopLeftRadius: '5px',
                                                    borderBottomLeftRadius:
                                                        '5px',
                                                }}
                                            >
                                                {info.label}
                                            </td>
                                            <td
                                                width="70%"
                                                style={{
                                                    backgroundColor: '#F7910F',
                                                    padding: '18px 16px',
                                                    fontSize: '14px',
                                                    borderTopRightRadius: '5px',
                                                    borderBottomRightRadius:
                                                        '5px',
                                                }}
                                            >
                                                {info.value}
                                            </td>
                                        </tr>
                                        {index !== workplaceInfo.length - 1 && (
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    height="10"
                                                ></td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td
                        align="center"
                        style={{ paddingTop: '24px', paddingBottom: '16px' }}
                    >
                        <h4
                            style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Available Meeting Appointments
                        </h4>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: '0 8px' }}>
                        <table
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                            style={{
                                backgroundColor: 'rgba(247, 145, 15, 0.15)',
                                borderRadius: '5px',
                            }}
                        >
                            <tbody>
                                <tr>
                                    {weekdays.map((day, index) => (
                                        <td
                                            key={index}
                                            align="center"
                                            style={{
                                                padding: '5px 0',
                                                color: '#24556D',
                                            }}
                                        >
                                            {day}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="10"></td>
                </tr>
                <tr>
                    <td style={{ padding: '0 8px' }}>
                        <table
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                        >
                            <tbody>
                                <tr>
                                    {timeslots.map((slot, index) => (
                                        <React.Fragment key={index}>
                                            <td
                                                width="20%"
                                                align="center"
                                                style={{
                                                    backgroundColor: slot.offDay
                                                        ? 'rgba(191, 0, 0, 0.15)'
                                                        : 'rgba(247, 145, 15, 0.15)',
                                                    borderRadius: '6px',
                                                    padding: '14px 0',
                                                }}
                                            >
                                                {slot.offDay ? (
                                                    <p
                                                        style={{
                                                            margin: 0,
                                                            fontSize: '14px',
                                                            color: '#24556D',
                                                        }}
                                                    >
                                                        Off Day
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p
                                                            style={{
                                                                margin: '0 0 4px 0',
                                                                fontSize:
                                                                    '14px',
                                                                color: '#24556D',
                                                            }}
                                                        >
                                                            {slot.startTime}
                                                        </p>
                                                        <p
                                                            style={{
                                                                margin: '0 0 4px 0',
                                                                fontSize:
                                                                    '14px',
                                                                color: '#24556D',
                                                            }}
                                                        >
                                                            -
                                                        </p>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize:
                                                                    '14px',
                                                                color: '#24556D',
                                                            }}
                                                        >
                                                            {slot.endTime}
                                                        </p>
                                                    </>
                                                )}
                                            </td>
                                            {index !== timeslots.length - 1 && (
                                                <td width="2%"></td>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style={{ paddingTop: '24px' }}>
                        <h4
                            style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Workplace On Map
                        </h4>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.8801221151166!2d72.83148717515525!3d33.556490843745685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df999324e8b081%3A0x4436b8765030008!2sIslamabad%20International%20Airport!5e0!3m2!1sen!2s!4v1725869828332!5m2!1sen!2s"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy={'no-referrer-when-downgrade'}
                        ></iframe>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: '20px 40px' }}>
                        <table
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                        >
                            <tbody>
                                <tr>
                                    <td
                                        align="center"
                                        style={{
                                            backgroundColor: '#229E57',
                                            borderRadius: '10px',
                                            padding: '12px',
                                        }}
                                    >
                                        <a
                                            href="#"
                                            style={{
                                                color: 'white',
                                                fontSize: '18px',
                                                fontWeight: 500,
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Approve
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td
                                        align="center"
                                        style={{
                                            borderRadius: '10px',
                                            padding: '12px',
                                        }}
                                    >
                                        <a
                                            href="#"
                                            style={{
                                                color: '#BF0000',
                                                fontSize: '18px',
                                                fontWeight: 500,
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Reject
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

EmailTemplate.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default EmailTemplate
