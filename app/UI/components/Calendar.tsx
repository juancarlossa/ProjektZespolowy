'use client'

import React from "react";
import { Calendar as Cal } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";


export default function Calendar () {
  let [date, setDate] = React.useState(today(getLocalTimeZone()));
  let { locale } = useLocale();
  let isInvalid = isWeekend(date, locale);

  return (
    <Cal
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
      showMonthAndYearPickers
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
    />
  );
}
