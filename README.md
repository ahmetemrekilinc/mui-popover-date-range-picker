# mui-popover-date-range-picker <!-- omit in toc -->

> mui-popover-date-range-picker a library for creating DateRange picker for MUI components in React projects.

<img alt="mui-popover-date-range-picker-example" src="https://raw.githubusercontent.com/ahmetemrekilinc/mui-popover-date-range-picker/master/public/mui-popover-date-range-picker-example.png" />

## Installation

**mui-popover-date-range-picker** requires:

-   React **18.0.0** or later

```shell
yarn add mui-popover-date-range-picker
```

or

```shell
npm install mui-popover-date-range-picker
```

## Usage

```js
import { useState } from 'react';
import DateRangePicker from 'mui-popover-date-range-picker';

const MyComponent = () => {
    const [value, setValue] = useState({ rangeStart: new Date(), rangeEnd: new Date() });

    return <DateRangePicker value={value} onChange={setValue} />;
};

export default MyComponent;
```

## Examples

Checkout live examples on [mui-popover-date-range-picker-demo](https://ahmetemrekilinc.github.io/mui-popover-date-range-picker) page for various customizations.

## API

| **Prop**                   | **Type** | **Required** | **Description**                                                                                    |
| -------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| **value**                  | array    | yes          | value of date range picker                                                                         |
| **onChange**               | func     | yes          | onChange event of date range picker                                                                |
| **disabled**               | bool     | no           | disabled state of date range picker                                                                |
| **format**                 | string   | no           | date format of date range picker                                                                   |
| **placeholderString**      | string   | no           | placeholder string of date range picker                                                            |
| **dateFormatter**          | func     | no           | date formatted function of date range picker                                                       |
| **clearIcon**              | node     | no           | clear icon of date range picker                                                                    |
| **calendarIcon**           | node     | no           | calendar icon of date range picker                                                                 |
| **texts**                  | object   | no           | CLEAR_TITLE, CLEAR_START_VALUE_TEXT, CLEAR_END_VALUE_TEXT, OPEN_CALENDAR_TITLE, CLOSE_BUTTON_TITLE |
| **popoverProps**           | object   | no           | Props of Popover component                                                                         |
| **stackProps**             | object   | no           | Props of Stack component                                                                           |
| **verticalDividerProps**   | object   | no           | Props of vertical Divider component                                                                |
| **horizontalDividerProps** | object   | no           | Props of horizontal Divider component                                                              |
| **startDateCalendarProps** | object   | no           | Props of DateCalendar component of range start                                                     |
| **endDateCalendarProps**   | object   | no           | Props of DateCalendar component of range end                                                       |
| **startClearButtonProps**  | object   | no           | Props of clear button of range start                                                               |
| **endClearButtonProps**    | object   | no           | Props of clear button of range end                                                                 |
| **enableTime**             | bool     | no           | Enable time selection                                                                              |
| **startClockProps**        | object   | no           | Props of clock component of range start                                                            |
| **endClockProps**          | object   | no           | Props of clock component of range end                                                              |
| **hideCloseButton**        | bool     | no           | Hide close button                                                                                  |
| **closeButtonProps**       | object   | no           | Props of close button component                                                                    |
| **innerRef**               | func     | no           | Ref for TextField                                                                                  |
