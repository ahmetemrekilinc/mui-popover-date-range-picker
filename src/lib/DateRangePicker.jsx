import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import { format as dateFnsFormat, parseISO } from 'date-fns';

import { TextField, Popover, Stack, Box, Divider, Button, IconButton, InputAdornment, Tooltip } from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ClearIcon from '@mui/icons-material/Clear';

import { isEmpty } from './ControlUtils';

const DEFAULT_FORMAT = 'MM/dd/yyyy';
const DEFAULT_FORMAT_WITH_TIME = 'MM/dd/yyyy HH:mm';
const DEFAULT_TEXTS = {
    CLEAR_TITLE: 'Clear',
    CLEAR_START_VALUE_TEXT: 'Clear',
    CLEAR_END_VALUE_TEXT: 'Clear',
    OPEN_CALENDAR_TITLE: 'Open Calendar',
};

const getText = (texts, key) => {
    return texts?.[key] || DEFAULT_TEXTS[key];
};

function RangeStartDay(props) {
    const { day, minDate, maxDate, hoveredStartDay, hoveredEndDay, ...other } = props;

    let newClassName = '';
    if (maxDate && maxDate.getTime() >= day.getTime()) {
        if (minDate && minDate.getTime() < day.getTime()) {
            newClassName = 'MuiPopoverDateRangePicker-dayInRange';
        } else {
            newClassName = 'MuiPopoverDateRangePicker-dayBeforeRange';
        }
        if (minDate && minDate.getTime() > day.getTime()) {
            newClassName = 'MuiPopoverDateRangePicker-dayBeforeRange';
        }
    }

    if (hoveredEndDay && hoveredEndDay.getTime() >= day.getTime()) {
        if (minDate && minDate.getTime() < day.getTime()) {
            newClassName += ' MuiPopoverDateRangePicker-dayInRangeOfHover';
        }
    }

    if (hoveredStartDay && hoveredStartDay.getTime() <= day.getTime()) {
        if (maxDate && maxDate.getTime() >= day.getTime()) {
            newClassName += ' MuiPopoverDateRangePicker-dayInRangeOfHover';
        }
    }

    return <PickersDay day={day} className={newClassName} {...other} />;
}

RangeStartDay.propTypes = {
    day: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    hoveredStartDay: PropTypes.object,
    hoveredEndDay: PropTypes.object,
};

function RangeEndDay(props) {
    const { day, minDate, maxDate, hoveredStartDay, hoveredEndDay, ...other } = props;

    let newClassName = '';
    if (minDate && minDate.getTime() <= day.getTime()) {
        if (maxDate && maxDate.getTime() > day.getTime()) {
            newClassName = 'MuiPopoverDateRangePicker-dayInRange';
        } else {
            newClassName = 'MuiPopoverDateRangePicker-dayAfterRange';
        }
        if (maxDate && maxDate.getTime() < day.getTime()) {
            newClassName = 'MuiPopoverDateRangePicker-dayAfterRange';
        }
    }

    if (hoveredStartDay && hoveredStartDay.getTime() <= day.getTime()) {
        if (maxDate && maxDate.getTime() > day.getTime()) {
            newClassName += ' MuiPopoverDateRangePicker-dayInRangeOfHover';
        }
    }

    if (hoveredEndDay && hoveredEndDay.getTime() >= day.getTime()) {
        if (minDate && minDate.getTime() <= day.getTime()) {
            newClassName += ' MuiPopoverDateRangePicker-dayInRangeOfHover';
        }
    }

    return <PickersDay day={day} className={newClassName} {...other} />;
}

RangeEndDay.propTypes = {
    day: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    hoveredStartDay: PropTypes.object,
    hoveredEndDay: PropTypes.object,
};

const DateRangePicker = (props) => {
    const {
        innerRef,
        value,
        onChange,
        disabled,
        format,
        placeholderString,
        dateFormatter,
        clearIcon,
        calendarIcon,
        texts,
        popoverProps,
        stackProps,
        verticalDividerProps,
        horizontalDividerProps,
        startDateCalendarProps,
        endDateCalendarProps,
        startClearButtonProps,
        endClearButtonProps,
        enableTime,
        startClockProps,
        endClockProps,
        ...other
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredStartDay, setHoveredStartDay] = useState(null);
    const [hoveredEndDay, setHoveredEndDay] = useState(null);

    const handleOpenPopover = useCallback((e) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const finalFormat = useMemo(() => {
        if (format) {
            return format;
        }
        return enableTime ? DEFAULT_FORMAT_WITH_TIME : DEFAULT_FORMAT;
    }, [format, enableTime]);

    const finalPlaceholderString = useMemo(() => {
        if (placeholderString) {
            return placeholderString;
        }
        return finalFormat ? finalFormat.toUpperCase() : '';
    }, [finalFormat, placeholderString]);

    const finalDateFormatter = useCallback(
        (dateValue) => {
            if (dateFormatter) {
                return dateFormatter(dateValue);
            }
            try {
                const formattedValue = dateFnsFormat(dateValue, finalFormat);
                return formattedValue;
            } catch (e) {
                console.error(e);
                return finalFormat;
            }
        },
        [finalFormat, dateFormatter]
    );

    const rangeStartValue = useMemo(() => {
        let result = null;
        if (value && value.rangeStart) {
            result = value.rangeStart;
            if (!isEmpty(result)) {
                if (typeof result === 'string') {
                    result = new Date(result);
                }
            }
        }
        return result;
    }, [value]);

    const rangeEndValue = useMemo(() => {
        let result = null;
        if (value && value.rangeEnd) {
            result = value.rangeEnd;
            if (!isEmpty(result)) {
                if (typeof result === 'string') {
                    result = new Date(result);
                }
            }
        }
        return result;
    }, [value]);

    const onRangeStartValueChange = useCallback(
        (newValue) => {
            let result = {};
            if (newValue) {
                result.rangeStart = newValue;
            }
            if (rangeEndValue) {
                result.rangeEnd = rangeEndValue;
            }
            if (!result.rangeStart && !result.rangeEnd) {
                result = null;
            }
            onChange(result);
        },
        [rangeEndValue, onChange]
    );

    const onRangeEndValueChange = useCallback(
        (newValue) => {
            let result = {};
            if (newValue) {
                result.rangeEnd = newValue;
            }
            if (rangeStartValue) {
                result.rangeStart = rangeStartValue;
            }
            if (!result.rangeStart && !result.rangeEnd) {
                result = null;
            }
            onChange(result);
        },
        [rangeStartValue, onChange]
    );

    const handleClearStartValue = useCallback(
        (e) => {
            e.stopPropagation();
            onRangeStartValueChange(null);
        },
        [onRangeStartValueChange]
    );

    const handleClearEndValue = useCallback(
        (e) => {
            e.stopPropagation();
            onRangeEndValueChange(null);
        },
        [onRangeEndValueChange]
    );

    const handleClear = useCallback(
        (e) => {
            e.stopPropagation();
            onChange(null);
        },
        [onChange]
    );

    const textFieldValue = useMemo(() => {
        let result = '';
        if (!isEmpty(rangeStartValue) || !isEmpty(rangeEndValue)) {
            const startValueText = !isEmpty(rangeStartValue)
                ? finalDateFormatter(rangeStartValue)
                : finalPlaceholderString;
            const endValueText = !isEmpty(rangeEndValue) ? finalDateFormatter(rangeEndValue) : finalPlaceholderString;
            result = `${startValueText} - ${endValueText}`;
        }
        return result;
    }, [finalDateFormatter, rangeStartValue, rangeEndValue, finalFormat, finalPlaceholderString]);

    const finalPlaceholder = useMemo(() => {
        return `${finalPlaceholderString} - ${finalPlaceholderString}`;
    }, [finalPlaceholderString]);

    const verticalDivider = useMemo(() => {
        return <Divider orientation="vertical" flexItem sx={{ xs: { display: 'none' } }} {...verticalDividerProps} />;
    }, [verticalDividerProps]);

    const horizontalDivider = useMemo(() => {
        return (
            <Divider orientation="horizontal" flexItem sx={{ sm: { display: 'none' } }} {...horizontalDividerProps} />
        );
    }, [horizontalDividerProps]);

    const maxOfStartValue = useMemo(() => {
        return rangeEndValue ? parseISO(rangeEndValue.toISOString()) : null;
    }, [rangeEndValue]);

    const minOfEndValue = useMemo(() => {
        return rangeStartValue ? parseISO(rangeStartValue.toISOString()) : null;
    }, [rangeStartValue]);

    const onMouseEnterRangeStartDay = useCallback(
        (e, newHoveredStartDay) => {
            setHoveredStartDay(newHoveredStartDay);
        },
        [setHoveredStartDay]
    );

    const onMouseLeaveRangeStartDay = useCallback(
        (e) => {
            setHoveredStartDay(null);
        },
        [setHoveredStartDay]
    );

    const onMouseEnterRangeEndDay = useCallback(
        (e, newHoveredEndDay) => {
            setHoveredEndDay(newHoveredEndDay);
        },
        [setHoveredEndDay]
    );

    const onMouseLeaveRangeEndDay = useCallback(
        (e) => {
            setHoveredEndDay(null);
        },
        [setHoveredEndDay]
    );

    let clearIconJsx = value ? (
        <Tooltip title={getText(texts, 'CLEAR_TITLE')}>
            <IconButton onClick={handleClear} edge="end" sx={{ display: disabled ? 'none' : 'inline-flex' }}>
                {clearIcon || <ClearIcon />}
            </IconButton>
        </Tooltip>
    ) : undefined;

    let calendarIconJsx = (
        <IconButton onClick={handleOpenPopover} edge="end" disabled={disabled}>
            {calendarIcon || <DateRangeIcon />}
        </IconButton>
    );

    if (!disabled) {
        calendarIconJsx = <Tooltip title={getText(texts, 'OPEN_CALENDAR_TITLE')}>{calendarIconJsx}</Tooltip>;
    }

    const inputLabelProps = !!anchorEl
        ? {
              shrink: true,
          }
        : {};

    return (
        <>
            <TextField
                ref={innerRef}
                value={textFieldValue}
                onClick={handleOpenPopover}
                className="MuiPopoverDateRangePicker"
                disabled={disabled}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Stack direction="row" spacing={1}>
                                    {clearIconJsx}
                                    {calendarIconJsx}
                                </Stack>
                            </InputAdornment>
                        ),
                    },
                    inputLabel: inputLabelProps,
                }}
                placeholder={finalPlaceholder}
                sx={{
                    '& .MuiInputBase-root': {
                        cursor: !disabled && 'pointer',
                        '& .MuiInputBase-input': { cursor: !disabled && 'pointer' },
                    },
                }}
                {...other}
            />
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                {...popoverProps}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    divider={
                        <>
                            {horizontalDivider}
                            {verticalDivider}
                        </>
                    }
                    {...stackProps}
                >
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center">
                        <Box
                            sx={{
                                position: 'relative',
                                '&:has(.MuiYearCalendar-root) .MuiDateRangePickerCalendarClearButton': {
                                    display: 'none',
                                },
                            }}
                        >
                            <DateCalendar
                                value={rangeStartValue}
                                onChange={onRangeStartValueChange}
                                maxDate={maxOfStartValue}
                                slots={{
                                    day: RangeStartDay,
                                }}
                                slotProps={{
                                    day: {
                                        minDate: rangeStartValue,
                                        maxDate: maxOfStartValue,
                                        hoveredStartDay: hoveredStartDay,
                                        hoveredEndDay: hoveredEndDay,
                                        onMouseEnter: onMouseEnterRangeStartDay,
                                        onMouseLeave: onMouseLeaveRangeStartDay,
                                    },
                                }}
                                {...startDateCalendarProps}
                            />
                            <Button
                                onClick={handleClearStartValue}
                                sx={{
                                    textTransform: 'none',
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 20,
                                    display: rangeStartValue ? 'inline-flex' : 'none',
                                }}
                                className="MuiDateRangePickerCalendarClearButton"
                                variant="outlined"
                                {...startClearButtonProps}
                            >
                                {getText(texts, 'CLEAR_START_VALUE_TEXT')}
                            </Button>
                        </Box>
                        {enableTime && (
                            <MultiSectionDigitalClock
                                ampm={false}
                                value={rangeStartValue}
                                onChange={onRangeStartValueChange}
                                {...startClockProps}
                            />
                        )}
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center">
                        <Box
                            sx={{
                                position: 'relative',
                                '&:has(.MuiYearCalendar-root) .MuiDateRangePickerCalendarClearButton': {
                                    display: 'none',
                                },
                            }}
                        >
                            <DateCalendar
                                value={rangeEndValue}
                                onChange={onRangeEndValueChange}
                                minDate={minOfEndValue}
                                slots={{
                                    day: RangeEndDay,
                                }}
                                slotProps={{
                                    day: {
                                        minDate: minOfEndValue,
                                        maxDate: rangeEndValue,
                                        hoveredStartDay: hoveredStartDay,
                                        hoveredEndDay: hoveredEndDay,
                                        onMouseEnter: onMouseEnterRangeEndDay,
                                        onMouseLeave: onMouseLeaveRangeEndDay,
                                    },
                                }}
                                {...endDateCalendarProps}
                            />
                            <Button
                                onClick={handleClearEndValue}
                                sx={{
                                    textTransform: 'none',
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 20,
                                    display: rangeEndValue ? 'inline-flex' : 'none',
                                }}
                                className="MuiDateRangePickerCalendarClearButton"
                                variant="outlined"
                                {...endClearButtonProps}
                            >
                                {getText(texts, 'CLEAR_END_VALUE_TEXT')}
                            </Button>
                        </Box>
                        {enableTime && (
                            <MultiSectionDigitalClock
                                ampm={false}
                                value={rangeEndValue}
                                onChange={onRangeEndValueChange}
                                {...endClockProps}
                            />
                        )}
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};

DateRangePicker.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    format: PropTypes.string,
    placeholderString: PropTypes.string,
    dateFormatter: PropTypes.func,
    clearIcon: PropTypes.node,
    calendarIcon: PropTypes.node,
    texts: PropTypes.object,
    popoverProps: PropTypes.object,
    stackProps: PropTypes.object,
    verticalDividerProps: PropTypes.object,
    horizontalDividerProps: PropTypes.object,
    startDateCalendarProps: PropTypes.object,
    endDateCalendarProps: PropTypes.object,
    startClearButtonProps: PropTypes.object,
    endClearButtonProps: PropTypes.object,
    enableTime: PropTypes.bool,
    startClockProps: PropTypes.object,
    endClockProps: PropTypes.object,
    innerRef: PropTypes.object,
};

export default DateRangePicker;
