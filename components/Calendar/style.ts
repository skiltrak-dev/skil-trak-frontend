import { getThemeColors } from '@theme'
import styled from 'styled-components'

const Colors = getThemeColors()

export const CalendarStyles = styled.div`
    .react-calendar__navigation {
        border-bottom: 1px solid #b7b7b7;
        // padding-bottom: 18px;
        color: #6b6b6b;
        margin-bottom: 15px;

        display: flex;
        align-items: center;
    }

    .react-calendar__navigation .react-calendar__navigation__prev-button,
    .react-calendar__navigation .react-calendar__navigation__next-button {
        font-size: 25px;
        padding: 0 8px;
    }

    .react-calendar__navigation .react-calendar__navigation__prev2-button,
    .react-calendar__navigation .react-calendar__navigation__next2-button {
        display: none;
    }

    .react-calendar__navigation .react-calendar__navigation__label {
        font-size: 14px;
        font-weight: 500;
    }

    .react-calendar {
        border: none;
        border-radius: 16px;
        padding: 10px;
        box-shadow: 8px 3px 22px 10px rgba(150, 150, 150, 0.11);
    }

    .react-calendar__month-view__days__day--weekend {
        color: #c3c3c3;
    }

    .react-calendar__month-view__weekdays__weekday * {
        text-decoration: none;
    }

    .react-calendar__month-view__weekdays__weekday {
        padding: -0.5em;
        color: #6b6b6b;
        font-size: 10px;
        text-align: center;
    }

    .react-calendar__month-view__days__day {
        font-size: 12px !important;
    }

    .react-calendar__tile {
        line-height: 25px !important;
        padding: 5px !important;
    }

    .react-calendar__tile--active,
    .react-calendar__tile--hasActive {
        background: #f97316;
        color: white;
        border-radius: 100% !important;
        -webkit-border-radius: 100% !important;
        -moz-border-radius: 100% !important;
        -ms-border-radius: 100% !important;
        -o-border-radius: 100% !important;
        flex-shrink: 0;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #fb923c;
        border-radius: 12px !important;
        -webkit-border-radius: 12px !important;
        -moz-border-radius: 12px !important;
        -ms-border-radius: 12px !important;
        -o-border-radius: 12px !important;
    }

    .react-calendar__tile:hover {
        background: #ffedd5;
        border-radius: 12px !important;
        -webkit-border-radius: 12px !important;
        -moz-border-radius: 12px !important;
        -ms-border-radius: 12px !important;
        -o-border-radius: 12px !important;
    }

    .react-calendar__tile--now {
        border-radius: 12px !important;
        -webkit-border-radius: 12px !important;
        -moz-border-radius: 12px !important;
        -ms-border-radius: 12px !important;
        -o-border-radius: 12px !important;
    }

    .react-calendar__year-view__months__month,
    .react-calendar__century-view__decades__decade,
    .react-calendar__decade-view__years__year,
    .react-calendar__year-view__months__month:hover,
    .react-calendar__century-view__decades__decade:hover,
    .react-calendar__decade-view__years__year:hover,
    .react-calendar__year-view__months__month:focus,
    .react-calendar__century-view__decades__decade:focus,
    .react-calendar__decade-view__years__year:focus {
        font-size: 12px;
        border-radius: 5px !important;
        -webkit-border-radius: 5px !important;
        -moz-border-radius: 5px !important;
        -ms-border-radius: 5px !important;
        -o-border-radius: 5px !important;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        color: transparent;
        pointer-events: none;
    }

    /*# sourceMappingURL=calendarStyle.css.map */
`
