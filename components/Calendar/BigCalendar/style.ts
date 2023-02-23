import styled from 'styled-components'

export const CalendarStyles = styled.div`
    position: relative;
    .rbc-time-view {
        border: none !important;
    }

    .rbc-time-view .rbc-row {
        // min-height: 60px;
        min-height: unset !important;
    }

    .rbc-allday-cell {
        display: none !important;
    }

    .rbc-time-header-content {
        border: none !important;
    }

    .rbc-header {
        text-align: left !important;
        padding: 0 !important;
        border-bottom: unset !important;
    }

    .rbc-time-content {
        border-top: 1px solid #ddd !important;
    }

    .rbc-timeslot-group {
        border-bottom: unset !important;
        min-height: 80px !important;
    }
`
