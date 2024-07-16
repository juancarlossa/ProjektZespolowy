'use client'

import React from "react";
import { RangeCalendar as Range } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";


export default function RangeCalendar () {
  let [date, setDate] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  let { locale } = useLocale();
  let isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <>
      <Range
        aria-label="Date (Invalid on weekends)"
        errorMessage={isInvalid ? "We are closed on weekends" : undefined}
        isInvalid={isInvalid}
        value={date}
        onChange={setDate}
        minValue={today(getLocalTimeZone())}
      />
      <div className="bg-white shadow sm:rounded-lg p-6 w-full max-w-md">
        <p>You chose from <span className="font-bold">{date.start.day}.{date.start.month}.{date.start.year}</span> to <span className="font-bold">{date.end.day}.{date.end.month}.{date.end.year}</span>
        </p>
      </div>
    </>
  );
}
