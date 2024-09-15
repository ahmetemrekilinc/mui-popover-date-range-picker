import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './App.css';
import HeaderInfo from './HeaderInfo';
import DateRangePicker from './lib';

function App() {
    const [value, setValue] = useState();
    const [disabled, setDisabled] = useState();
    const [format, setFormat] = useState();
    const [placeholderString, setPlaceholderString] = useState();
    const [enableTime, setEnableTime] = useState();

    const currentJsx = (
        <DateRangePicker
            value={value}
            onChange={setValue}
            fullWidth={true}
            disabled={disabled}
            format={format}
            placeholderString={placeholderString}
            enableTime={enableTime}
        />
    );

    const ignoreProps = [];
    if (disabled === undefined) {
        ignoreProps.push('disabled');
    }
    if (format === undefined) {
        ignoreProps.push('format');
    }
    if (placeholderString === undefined) {
        ignoreProps.push('placeholderString');
    }
    if (enableTime === undefined) {
        ignoreProps.push('enableTime');
    }

    let currentJsxString = jsxToString(currentJsx, {
        displayName: 'DateRangePicker',
        useFunctionCode: true,
        ignoreProps: ignoreProps,
    });
    currentJsxString = "import DateRangePicker from 'mui-popover-date-range-picker';\n\n" + currentJsxString;
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="App">
                <HeaderInfo />
                <div className="exampleDemo">
                    <br />
                    <h1>
                        <a
                            href={'https://www.npmjs.com/package/mui-popover-date-range-picker'}
                            target="_blank"
                            rel="noreferrer"
                        >
                            mui-popover-date-range-picker
                        </a>
                    </h1>

                    <div className="installationDiv">
                        <pre>npm install mui-popover-date-range-picker</pre>
                        <pre>yarn add mui-popover-date-range-picker</pre>
                    </div>

                    <h3>
                        <a
                            href="https://github.com/ahmetemrekilinc/mui-popover-date-range-picker/blob/master/src/App.jsx"
                            target="_blank"
                            rel="noreferrer"
                        >
                            View on GitHub
                        </a>
                    </h3>
                    <div className="exampleWrapperDiv">{currentJsx}</div>

                    <div className="settingsDiv">
                        <div className="settingsItem">
                            <label htmlFor="disabled">disabled:</label>
                            <input
                                type="checkbox"
                                id="disabled"
                                checked={disabled || false}
                                onChange={(e) => setDisabled(e.target.checked)}
                            />
                        </div>
                        <div className="settingsItem">
                            <label htmlFor="format">format:</label>
                            <input
                                type="text"
                                id="format"
                                value={format || ''}
                                onChange={(e) => setFormat(e.target.value)}
                            />
                        </div>
                        <div className="settingsItem">
                            <label htmlFor="placeholderString">placeholderString:</label>
                            <input
                                type="text"
                                id="placeholderString"
                                value={placeholderString || ''}
                                onChange={(e) => setPlaceholderString(e.target.value)}
                            />
                        </div>
                        <div className="settingsItem">
                            <label htmlFor="enableTime">enableTime:</label>
                            <input
                                type="checkbox"
                                id="enableTime"
                                checked={enableTime || false}
                                onChange={(e) => setEnableTime(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="currentJsxDiv">
                        <h2>Current JSX</h2>
                        <span>{currentJsxString}</span>
                    </div>

                    <h2>LIVE DEMO</h2>

                    <div className="demoLinkDiv">
                        <a
                            href="https://stackblitz.com/edit/mui-popover-date-range-picker-demo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h3>Checkout Live Demo</h3>
                        </a>
                    </div>

                    <div className="apiDiv">
                        <h2>API</h2>
                        <table className="apiTable">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>value</td>
                                    <td>array</td>
                                    <td>yes</td>
                                    <td>value of date range picker</td>
                                </tr>
                                <tr>
                                    <td>onChange</td>
                                    <td>func</td>
                                    <td>yes</td>
                                    <td>onChange event of date range picker</td>
                                </tr>
                                <tr>
                                    <td>disabled</td>
                                    <td>bool</td>
                                    <td>no</td>
                                    <td>disabled state of date range picker</td>
                                </tr>
                                <tr>
                                    <td>format</td>
                                    <td>string</td>
                                    <td>no</td>
                                    <td>date format of date range picker</td>
                                </tr>
                                <tr>
                                    <td>placeholderString</td>
                                    <td>string</td>
                                    <td>no</td>
                                    <td>placeholder string of date range picker</td>
                                </tr>
                                <tr>
                                    <td>dateFormatter</td>
                                    <td>func</td>
                                    <td>no</td>
                                    <td>date formatted function of date range picker</td>
                                </tr>
                                <tr>
                                    <td>clearIcon</td>
                                    <td>node</td>
                                    <td>no</td>
                                    <td>clear icon of date range picker</td>
                                </tr>
                                <tr>
                                    <td>calendarIcon</td>
                                    <td>node</td>
                                    <td>no</td>
                                    <td>calendar icon of date range picker</td>
                                </tr>
                                <tr>
                                    <td>texts</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>
                                        CLEAR_TITLE, CLEAR_START_VALUE_TEXT, CLEAR_END_VALUE_TEXT, OPEN_CALENDAR_TITLE
                                    </td>
                                </tr>
                                <tr>
                                    <td>popoverProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of Popover component</td>
                                </tr>
                                <tr>
                                    <td>stackProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of Stack component</td>
                                </tr>
                                <tr>
                                    <td>verticalDividerProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of vertical Divider component</td>
                                </tr>
                                <tr>
                                    <td>horizontalDividerProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of horizontal Divider component</td>
                                </tr>
                                <tr>
                                    <td>startDateCalendarProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of DateCalendar component of range start</td>
                                </tr>
                                <tr>
                                    <td>endDateCalendarProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of DateCalendar component of range end</td>
                                </tr>
                                <tr>
                                    <td>startClearButtonProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of clear button of range start</td>
                                </tr>
                                <tr>
                                    <td>endClearButtonProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of clear button of range end</td>
                                </tr>
                                <tr>
                                    <td>enableTime</td>
                                    <td>bool</td>
                                    <td>no</td>
                                    <td>Enable time selection</td>
                                </tr>
                                <tr>
                                    <td>startClockProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of clock component of range start</td>
                                </tr>
                                <tr>
                                    <td>endClockProps</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Props of clock component of range end</td>
                                </tr>
                                <tr>
                                    <td>innerRef</td>
                                    <td>object</td>
                                    <td>no</td>
                                    <td>Ref for TextField</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default App;
