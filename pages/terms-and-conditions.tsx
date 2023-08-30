import { Typography } from '@components'
import { SiteLayout } from '@layouts'
import Image from 'next/image'

import { BsArrowRightCircle } from 'react-icons/bs'

const TERMS = [
    {
        section: 'About the Website',
        text: `
    Welcome to www.skiltrak.com.au (the '<b>Website</b>'). The Website Learning management 
    system for practical placements, employment services for students (the '<b>Services</b>'). 
    The Website is operated by JK Connections PTY. LTD. (ABN 58634992706). Access to and use 
    of the Website, or any of its associated Products or Services, is provided by JK Connections 
    PTY LTD . Please read these terms and conditions (the '<b>Terms</b>') carefully. By using, browsing 
    and/or reading the Website, this signifies that you have read, understood and agree to be bound 
    by the Terms. If you do not agree with the Terms, you must cease usage of the Website, or any of 
    Services, immediately. JK Connections PTY LTD reserves the right to review and change any of the 
    Terms by updating this page at its sole discretion. When JK Connections PTY LTD updates the Terms, 
    it will use reasonable endeavours to provide you with notice of updates to the Terms. Any changes 
    to the Terms take immediate effect from the date of their publication. Before you continue, we recommend 
    you keep a copy of the Terms for your records.
`,
    },

    {
        section: 'Acceptance of the Terms',
        text: `
    You accept the Terms by remaining on the Website. You may also accept the Terms by clicking to accept 
    or agree to the Terms where this option is made available to you by JK Connections PTY LTD in the user interface.
  `,
    },

    {
        section: 'Subscription to use the Services',
        text: `
    In order to access the Services, you must first purchase a subscription through the Website (the '<b>Subscription</b>')
    and pay the applicable fee for the selected Subscription (the '<b>Subscription Fee</b>'). In purchasing 
    the Subscription, you acknowledge and agree that it is your responsibility to ensure that the Subscription
    you elect to purchase is suitable for your use. 
    Once you have purchased the Subscription, you will then be required to register for an account through the 
    Website before you can access the Services (the '<b>Account</b>').
  `,
    },

    {
        section: 'Your obligations as a Member',
        text: `
    As a Member, you agree to comply with the following: <br/>
    You will use the Services only for purposes that are permitted by: <br/>
    the Terms; and <br/>
    any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions; <br/>
    you have the sole responsibility for protecting the confidentiality of your password and/or email address. <br/>
    Use of your password by any other person may result in the immediate cancellation of the Services; <br/>
    any use of your registration information by any other person, or third parties, is strictly prohibited. You agree to immediately notify JK Connections PTY LTD of any unauthorised use of your password or email address or any breach of security of which you have become aware;

access and use of the Website is limited, non-transferable and allows for the sole use of the Website by you for the purposes of JK Connections PTY LTD providing the Services;

you will not use the Services or the Website in connection with any commercial endeavours except those that are specifically endorsed or approved by the management of JK Connections PTY LTD ;

you will not use the Services or Website for any illegal and/or unauthorised use which includes collecting email addresses of Members by electronic or other means for the purpose of sending unsolicited email or unauthorised framing of or linking to the Website;

you agree that commercial advertisements, affiliate links, and other forms of solicitation may be removed from the Website without notice and may result in termination of the Services. Appropriate legal action will be taken by JK Connections PTY LTD for any illegal or unauthorised use of the Website; and

you acknowledge and agree that any automated use of the Website or its Services is prohibited.
  `,
    },

    {
        section: 'Payment',
        text: `
    All payments made in the course of your use of the Services are made using Bank account transfer. In using the Website, the Services or when making any payment in relation to your use of the Services, you warrant that you have read, understood and agree to be bound by the Bank account transfer terms and conditions which are available on their website.

You acknowledge and agree that where a request for the payment of theSubscription Fee is returned or denied, for whatever reason, by your financial institution or is unpaid by you for any other reason, then you are liable for any costs, including banking fees and charges, associated with the Subscription Fee .

You agree and acknowledge that JK Connections PTY LTD can vary theSubscription Fee at any time and that the varied Subscription Fee will come into effect following the conclusion of the existing Subscription Period.
`,
    },

    {
        section: 'Refund Policy',
        text: `
    JK Connections PTY LTD will only provide you with a refund of the Subscription Fee in the event they are unable to continue to provide the Services or if the manager of JK Connections PTY LTD makes a decision, at its absolute discretion, that it is reasonable to do so under the circumstances . Where this occurs, 
    the refund will be in the proportional amount of the Subscription Fee that remains unused by the Member (the '<b>Refund</b>').
    `,
    },

    {
        section: 'Copyright and Intellectual Property',
        text: `
    The Website, the Services and all of the related products of JK Connections PTY LTD are subject to copyright. The material on the Website is protected by copyright under the laws of Australia and through international treaties. Unless otherwise indicated, all rights (including copyright) in the Services and compilation of the Website (including but not limited to text, graphics, logos, button icons, video images, audio clips, Website, code, scripts, design elements and interactive features) or the Services are owned or controlled for these purposes, and are reserved by JK Connections PTY LTD or its contributors.

    All trademarks, service marks and trade names are owned, registered and/or licensed by JK Connections PTY LTD , who grants to you a worldwide, non-exclusive, royalty-free, revocable license whilst you are a Member to:
    
    use the Website pursuant to the Terms;
    
    copy and store the Website and the material contained in the Website in your device's cache memory; and
    
    print pages from the Website for your own personal and non-commercial use.
    
    JK Connections PTY LTD does not grant you any other rights whatsoever in relation to the Website or the Services. All other rights are expressly reserved by JK Connections PTY LTD .
    
    JK Connections PTY LTD retains all rights, title and interest in and to the Website and all related Services. Nothing you do on or in relation to the Website will transfer any:
    
    business name, trading name, domain name, trade mark, industrial design, patent, registered design or copyright, or
    
    a right to use or exploit a business name, trading name, domain name, trade mark or industrial design, or
    
    a thing, system or process that is the subject of a patent, registered design or copyright (or an adaptation or modification of such a thing, system or process),
    
    to you.
    
    You may not, without the prior written permission of JK Connections PTY LTD and the permission of any other relevant rights owners: broadcast, republish, up-load to a third party, transmit, post, distribute, show or play in public, adapt or change in any way the Services or third party Services for any purpose, unless otherwise provided by these Terms. This prohibition does not extend to materials on the Website, which are freely available for re-use or are in the public domain.
    `,
    },

    {
        section: 'Privacy',
        text: `JK Connections PTY LTD takes your privacy seriously and any information provided through your use of the Website and/or Services are subject to JK Connections PTY LTD 's Privacy Policy, which is available on the Website.`,
    },

    {
        section: 'General Disclaimer',
        text: `Nothing in the Terms limits or excludes any guarantees, warranties, representations or conditions implied or imposed by law, including the Australian Consumer Law (or any liability under them) which by law may not be limited or excluded.

    Subject to this clause, and to the extent permitted by law:
    
    all terms, guarantees, warranties, representations or conditions which are not expressly stated in the Terms are excluded; and
    
    JK Connections PTY LTD will not be liable for any special, indirect or consequential loss or damage (unless such loss or damage is reasonably foreseeable resulting from our failure to meet an applicable Consumer Guarantee), loss of profit or opportunity, or damage to goodwill arising out of or in connection with the Services or these Terms (including as a result of not being able to use the Services or the late supply of the Services), whether at common law, under contract, tort (including negligence), in equity, pursuant to statute or otherwise.
    
    Use of the Website and the Services is at your own risk. Everything on the Website and the Services is provided to you "as is" and "as available" without warranty or condition of any kind. None of the affiliates, directors, officers, employees, agents, contributors and licensors of JK Connections PTY LTD make any express or implied representation or warranty about the Services or any products or Services (including the products or Services of JK Connections PTY LTD ) referred to on the Website. includes (but is not restricted to) loss or damage you might suffer as a result of any of the following:
    
    failure of performance, error, omission, interruption, deletion, defect, failure to correct defects, delay in operation or transmission, computer virus or other harmful component, loss of data, communication line failure, unlawful third party conduct, or theft, destruction, alteration or unauthorised access to records;
    
    the accuracy, suitability or currency of any information on the Website, the Services, or any of its Services related products (including third party material and advertisements on the Website);
    
    costs incurred as a result of you using the Website, the Services or any of the products of JK Connections PTY LTD ; and
    
    the Services or operation in respect to links which are provided for your convenience.`,
    },

    {
        section: 'Education Services',
        text: `
    By using our services, you agree that JK Connections PTY LTD is not to be held liable for any decisions you make based on any of our services or guidance and any consequences, as a result, are your own. Under no circumstances can you hold JK Connections PTY LTD liable for any actions you take nor can you hold us or any of our employees liable for any loss or costs incurred by you as a result of any guidance, advice, coaching, materials or techniques used or provided by JK Connections PTY LTD .

    All our information on both the website and in consultations is intended to assist you and does not in any way, nor is it intended to substitute professional, financial or legal advice. Results are not guaranteed and JK Connections PTY LTD takes no responsibility for your actions, choices or decisions.
    `,
    },

    {
        section: 'Limitation of liability',
        text: `
    JK Connections PTY LTD 's total liability arising out of or in connection with the Services or these Terms, however arising, including under contract, tort (including negligence), in equity, under statute or otherwise, will not exceed the resupply of the Services to you.

    You expressly understand and agree that JK Connections PTY LTD , its affiliates, employees, agents, contributors and licensors shall not be liable to you for any direct, indirect, incidental, special consequential or exemplary damages which may be incurred by you, however caused and under any theory of liability. This shall include, but is not limited to, any loss of profit (whether incurred directly or indirectly), any loss of goodwill or business reputation and any other intangible loss.
    `,
    },

    {
        section: 'Termination of Contract',
        text: `The Terms will continue to apply until terminated by either you or by JK Connections PTY LTD as set out below.

    If you want to terminate the Terms, you may do so by:
    
    providing JK Connections PTY LTD with 14 days' notice of your intention to terminate; and
    
    closing your accounts for all of the services which you use, where JK Connections PTY LTD has made this option available to you.
    
    Your notice should be sent, in writing, to JK Connections PTY LTD via the 'Contact Us' link on our homepage.
    
    JK Connections PTY LTD may at any time, terminate the Terms with you if:
    
    you have breached any provision of the Terms or intend to breach any provision;
    
    JK Connections PTY LTD is required to do so by law;
    
    the provision of the Services to you by JK Connections PTY LTD is, in the opinion of JK Connections PTY LTD , no longer commercially viable.
    
    Subject to local applicable laws, JK Connections PTY LTD reserves the right to discontinue or cancel your membership at any time and may suspend or deny, in its sole discretion, your access to all or any portion of the Website or the Services without notice if you breach any provision of the Terms or any applicable law or if your conduct impacts JK Connections PTY LTD 's name or reputation or violates the rights of those of another party.`,
    },

    {
        section: 'Indemnity',
        text: `You agree to indemnify JK Connections PTY LTD , its affiliates, employees, agents, contributors, third party content providers and licensors from and against:

    all actions, suits, claims, demands, liabilities, costs, expenses, loss and damage (including legal fees on a full indemnity basis) incurred, suffered or arising out of or in connection with Your Content;
    
    any direct or indirect consequences of you accessing, using or transacting on the Website or attempts to do so; and/or
    
    any breach of the Terms.`,
    },

    {
        section: 'Dispute Resolution',
        subsections: [
            {
                section: '15.1. Compulsory:',
                text: 'If a dispute arises out of or relates to the Terms, either party may not commence any Tribunal or Court proceedings in relation to the dispute, unless the following clauses have been complied with (except where urgent interlocutory relief is sought).',
            },
            {
                section: '15.2. Notice:',
                text: "A party to the Terms claiming a dispute ('Dispute') has arisen under the Terms, must give written notice to the other party detailing the nature of the dispute, the desired outcome and the action required to settle the Dispute.",
            },
            {
                section: '15.3. Resolution:',
                text: `On receipt of that notice ('Notice') by that other party, the parties to the Terms ('Parties') must:

        Within 14 days of the Notice endeavour in good faith to resolve the Dispute expeditiously by negotiation or such other means upon which they may mutually agree;
        
        If for any reason whatsoever, 28 days after the date of the Notice, the Dispute has not been resolved, the Parties must either agree upon selection of a mediator or request that an appropriate mediator be appointed by the President of the Australian Mediation Association or his or her nominee;
        
        The Parties are equally liable for the fees and reasonable expenses of a mediator and the cost of the venue of the mediation and without limiting the foregoing undertake to pay any amounts requested by the mediator as a pre-condition to the mediation commencing. The Parties must each pay their own costs associated with the mediation;
        
        The mediation will be held in Melbourne, Australia.`,
            },
            {
                section: `15.4. Confidential:`,
                text: `All communications concerning negotiations made by the Parties arising out of and in connection with this dispute resolution clause are confidential and to the extent possible, must be treated as "without prejudice" negotiations for the purpose of applicable laws of evidence.`,
            },
            {
                section: `15.5. Termination of Mediation:`,
                text: `If 3 months have elapsed after the start of a mediation of the Dispute and the Dispute has not been resolved, either Party may ask the mediator to terminate the mediation and the mediator must do so.`,
            },
            {
                section: `Venue and Jurisdiction`,
                text: `The Services offered by JK Connections PTY LTD is intended to be viewed by residents of Australia. In the event of any dispute arising out of or in relation to the Website, you agree that the exclusive venue for resolving any dispute shall be in the courts of Victoria, Australia.`,
            },
            {
                section: `Governing Law`,
                text: `The Terms are governed by the laws of Victoria, Australia. Any dispute, controversy, proceeding or claim of whatever nature arising out of or in any way relating to the Terms and the rights created hereby shall be governed, interpreted and construed by, under and pursuant to the laws of Victoria, Australia, without reference to conflict of law principles, notwithstanding mandatory rules. The validity of this governing law clause is not contested. The Terms shall be binding to the benefit of the parties hereto and their successors and assigns.`,
            },
            {
                section: `Independent Legal Advice`,
                text: `Both parties confirm and declare that the provisions of the Terms are fair and reasonable and both parties having taken the opportunity to obtain independent legal advice and declare the Terms are not against public policy on the grounds of inequality or bargaining power or general grounds of restraint of trade.`,
            },
            {
                section: `Severance`,
                text: `If any part of these Terms is found to be void or unenforceable by a Court of competent jurisdiction, that part shall be severed and the rest of the Terms shall remain in force.`,
            },
        ],
    },
]

const bgColors = [
    'bg-[#FFFAEF]',
    'bg-[#F3F8FC]',
    'bg-[#E8F8F4]',
    'bg-[#FDF7F6]',
    'bg-[#FBFBFC]',
    'bg-[#EFFAFD]',
]

const Page = () => {
    return (
        <SiteLayout title={'Terms & Conditions'}>
            <div className="h-96 bg-gradient-to-r from-[#0a56b0] to-[rgba(52, 91, 135, 0)] w-full">
                <div className="h-full max-w-3xl mx-auto flex flex-col justify-center items-center">
                    <Typography variant={'h1'} color="text-white">
                        TERMS & Conditions
                    </Typography>
                    <Typography
                        variant={'subtitle'}
                        color={'text-white'}
                        center
                    >
                        We have knowledgeable and friendly professionals
                        available to schedule an appointment or answer any
                        questions you may have in relation to Work Placement .
                        Call us today!
                    </Typography>
                </div>
            </div>

            <div className="w-11/12 my-4 mx-auto">
                {TERMS.map((t, k) => (
                    <div key={k}>
                        <div className="flex items-center font-semibold text-2xl text-theme-primary mt-4">
                            <div className="flex flex-col gap-y-2">
                                <Typography variant={'title'}>
                                    {t?.section}
                                </Typography>

                                {t.text && (
                                    <div
                                        className={`${
                                            bgColors[k % bgColors?.length]
                                        } p-5 rounded-md shadow border border-gray-200`}
                                    >
                                        <Typography variant={'label'}>
                                            <p
                                                className="text-gray-600 mt-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: t.text,
                                                }}
                                            ></p>
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>

                        {t.subsections &&
                            t.subsections?.map((ss, k) => (
                                <div key={k}>
                                    <div className="flex items-center font-semibold text-xl text-theme-primary mt-2">
                                        <BsArrowRightCircle className="mr-2" />
                                        <h3>{ss.section}</h3>
                                    </div>

                                    {ss?.text && (
                                        <div
                                            className={`${
                                                bgColors[k % bgColors?.length]
                                            } p-5 rounded-md shadow border border-gray-200`}
                                        >
                                            <Typography variant={'label'}>
                                                <p
                                                    className="text-gray-600 mt-2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: ss?.text,
                                                    }}
                                                ></p>
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                ))}

                <div className="italic text-secondary text-sm text-right mt-8">
                    <p>Last update: 6 March 2023</p>
                </div>
            </div>
        </SiteLayout>
    )
}

export default Page
