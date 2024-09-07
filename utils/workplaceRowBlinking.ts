import moment from "moment";

export const isAwaitingAgreementBeyondSevenDays = (industry: any) => {
    const applied = industry?.applied === true;

    const agreementNotSigned = industry?.AgreementSigned !== true;
    const agreementDateNull = industry?.AgreementSignedDate === null;

    const awaitingAgreement = industry?.awaitingAgreementSigned === true;

    const interviewDate = industry?.interviewDate !== null;
    const isCompletedDate = industry?.isCompletedDate === null;
    const placementStartedDate = industry?.placementStartedDate === null;
    const isMoreThanSevenDaysSinceAwaitingAgreement = moment().diff(
        moment(industry?.awaitingAgreementSignedDate),
        'days'
    ) > 7;
  

    return (
        applied &&
        isCompletedDate &&
        placementStartedDate &&
        ((interviewDate && agreementNotSigned  ) ||
            (agreementNotSigned && isMoreThanSevenDaysSinceAwaitingAgreement && agreementDateNull && awaitingAgreement))
    );
};

export const isWorkplaceValid = (workplace: any) => {
    const industriesExist = workplace?.industries?.length > 0;
    const currentStatusInterview = workplace?.currentStatus === 'interview';
    const currentStatusMeeting = workplace?.currentStatus === 'meeting';
    const isMoreThanSevenDays =
    moment().diff(
        moment(workplace?.createdAt),
        'days'
    ) >= 7
    return (
        (currentStatusInterview ||
        currentStatusMeeting) && isMoreThanSevenDays ||
        (industriesExist && isMoreThanSevenDays &&
            workplace?.industries?.some((industry: any) => isAwaitingAgreementBeyondSevenDays(industry)))
    );
};

