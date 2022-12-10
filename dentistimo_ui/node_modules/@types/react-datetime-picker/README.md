# Installation
> `npm install --save @types/react-datetime-picker`

# Summary
This package contains type definitions for react-datetime-picker (https://github.com/wojtekmaj/react-datetime-picker (Does not have to be to GitHub).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-datetime-picker.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-datetime-picker/index.d.ts)
````ts
// Type definitions for react-datetime-picker 3.4
// Project: https://github.com/wojtekmaj/react-datetime-picker (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Chris Frewin <https://github.com/princefishthrower>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as React from 'react';

export default function DateTimePicker(props: DateTimePickerProps): JSX.Element;

export interface DateTimePickerProps {
    amPmAriaLabel?: string;
    autoFocus?: boolean;
    calendarAriaLabel?: string;
    calendarClassName?: string | string[];
    calendarIcon?: JSX.Element | null;
    className?: string | string[];
    clearAriaLabel?: string;
    clearIcon?: JSX.Element | null;
    clockClassName?: string | string[];
    closeWidgets?: boolean;
    dayAriaLabel?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    disableCalendar?: boolean;
    disableClock?: boolean;
    format?: string;
    hourAriaLabel?: string;
    hourPlaceholder?: string;
    isCalendarOpen?: boolean;
    isClockOpen?: boolean;
    locale?: string;
    maxDate?: Date;
    maxDetail?: 'hour' | 'minute' | 'second';
    minDate?: Date;
    minDetail?: 'month' | 'year' | 'decade' | 'century';
    minuteAriaLabel?: string;
    minutePlaceholder?: string;
    monthAriaLabel?: string;
    monthPlaceholder?: string;
    name?: string;
    nativeInputAriaLabel?: string;
    onCalendarClose?: () => void;
    onCalendarOpen?: () => void;
    onChange?: (value: Date) => void;
    onClockClose?: () => void;
    onClockOpen?: () => void;
    openWidgetsOnFocus?: boolean;
    returnValue?: 'start' | 'end' | 'range';
    required?: boolean;
    secondAriaLabel?: string;
    secondPlaceholder?: string;
    showLeadingZeros?: boolean;
    value?: Date | [Date, Date];
    yearAriaLabel?: string;
    yearPlaceholder?: string;
}

````

### Additional Details
 * Last updated: Sat, 11 Dec 2021 21:31:08 GMT
 * Dependencies: [@types/react](https://npmjs.com/package/@types/react)
 * Global values: none

# Credits
These definitions were written by [Chris Frewin](https://github.com/princefishthrower).
