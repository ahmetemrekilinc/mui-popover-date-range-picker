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
    const [value, setValue] = useState([new Date(), new Date()]);

    return <DateRangePicker value={value} onChange={setValue} />;
};

export default MyComponent;
```

## Examples

Checkout live examples on [mui-popover-date-range-picker-demo](https://ahmetemrekilinc.github.io/mui-popover-date-range-picker) page for various customizations.

## API

| **Prop**     | **Type** | **Required** | **Description**                     |
| ------------ | -------- | ------------ | ----------------------------------- |
| **value**    | array    | yes          | value of date range picker          |
| **onChange** | func     | yes          | onChange event of date range picker |
