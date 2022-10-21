import React, { useState } from "react";
import Calendar from "react-calendar";

import { CalendarStyles } from "./style";

export const SidebarCalendar = () => {
	const [date, setDate] = useState(new Date());

	return (
		<>
			<CalendarStyles>
				<Calendar onChange={setDate} value={date} />
			</CalendarStyles>
		</>
	);
};
