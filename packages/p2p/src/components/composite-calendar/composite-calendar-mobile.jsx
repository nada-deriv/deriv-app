import React from 'react';
import PropTypes from 'prop-types';
import { Button, DatePicker, Icon, InputField, MobileDialog } from '@deriv/components';
import { toMoment } from '@deriv/shared';
import { localize } from '@deriv/translations';
import CalendarFooter from './calendar-footer';
import RadioButton from './radio-button';
import './composite-calendar-mobile.scss';

const CUSTOM_KEY = 'custom';

const CompositeCalendarMobile = ({ input_date_range, current_focus, duration_list, onChange, setCurrentFocus }) => {
    const date_range = input_date_range || duration_list.find(range => range.value === 'all_time');

    const [from, setFrom] = React.useState(null);
    const [to, setTo] = React.useState(null);
    const [is_open, setIsOpen] = React.useState(false);

    const [applied_date_range, setAppliedDateRange] = React.useState(date_range);
    const [selected_date_range, setSelectedDateRange] = React.useState(date_range);

    const selectDateRange = (_selected_date_range, is_today) => {
        const new_from = _selected_date_range.duration;
        onChange(
            {
                from:
                    is_today || new_from
                        ? toMoment().startOf('day').subtract(new_from, 'day').add(1, 's').unix()
                        : null,
                to: toMoment().endOf('day').unix(),
                is_batch: true,
            },
            {
                date_range: _selected_date_range,
            }
        );
    };

    const selectCustomDateRange = () => {
        const today = toMoment().format('DD MMM YYYY');

        const new_from = from || to || today;
        const new_to = to || today;

        const new_date_range = Object.assign(selected_date_range, {
            label: `${new_from} - ${new_to}`,
        });

        onChange(
            {
                from: toMoment(new_from, 'DD MMM YYYY').startOf('day').add(1, 's').unix(),
                to: toMoment(new_to, 'DD MMM YYYY').endOf('day').unix(),
                is_batch: true,
            },
            {
                date_range: new_date_range,
            }
        );
    };

    const applyDateRange = () => {
        if (selected_date_range.onClick) {
            selectDateRange(selected_date_range);
        } else if (selected_date_range.value === CUSTOM_KEY) {
            selectCustomDateRange();
        }
        setAppliedDateRange(selected_date_range);
        setIsOpen(false);
    };

    const selectToday = () => {
        const new_date_range = {
            duration: 0,
            label: localize('Today'),
        };
        selectDateRange(new_date_range, true);
        setAppliedDateRange(new_date_range);
        setSelectedDateRange(new_date_range);
        setIsOpen(false);
    };

    const selectDate = (e, key) => {
        setSelectedDateRange({ value: CUSTOM_KEY });

        const value = e.target?.value ? toMoment(e.target.value).format('DD MMM YYYY') : '';

        if (key === 'from') {
            setFrom(value);
        } else {
            setTo(value);
        }
    };

    const onDateRangeChange = _date_range => {
        setSelectedDateRange(
            duration_list.find(range => _date_range && range.value === _date_range.value) || _date_range
        );
    };

    const openDialog = () => {
        setSelectedDateRange(applied_date_range);
        setIsOpen(true);
    };

    const today = toMoment().format('YYYY-MM-DD');
    const max_date = to ? toMoment(to, 'DD MMM YYYY').format('YYYY-MM-DD') : today;
    const min_date = from && toMoment(from, 'DD MMM YYYY').format('YYYY-MM-DD');

    return (
        <React.Fragment>
            <div className='composite-calendar__input-fields composite-calendar__input-fields--fill'>
                <InputField
                    data_testid='dt_calendar_input'
                    current_focus={current_focus}
                    is_read_only
                    icon={() => <Icon icon='IcCalendarDatefrom' className='inline-icon' />}
                    onClick={openDialog}
                    setCurrentFocus={setCurrentFocus}
                    value={applied_date_range.label}
                />
            </div>
            <MobileDialog
                portal_element_id='modal_root'
                title={localize('Please select duration')}
                visible={is_open}
                has_content_scroll
                onClose={() => setIsOpen(false)}
                content_height_offset='94px'
                footer={<CalendarFooter setIsOpen={setIsOpen} applyDateRange={applyDateRange} />}
            >
                <div className='composite-calendar-modal'>
                    <div className='composite-calendar-modal__radio-group'>
                        {duration_list
                            .filter(({ value }) => value !== 'today')
                            .map(duration => (
                                <RadioButton
                                    id={`composite-calendar-modal__radio__${duration.value}`}
                                    key={duration.value}
                                    value={duration.value}
                                    label={duration.label}
                                    selected_value={selected_date_range.value}
                                    onChange={onDateRangeChange}
                                />
                            ))}
                    </div>
                    <div className='composite-calendar-modal__custom'>
                        <div className='composite-calendar-modal__custom__wrapper'>
                            <RadioButton
                                id='composite-calendar-modal__custom-radio'
                                className='composite-calendar-modal__custom-radio'
                                value={CUSTOM_KEY}
                                label={localize('Custom')}
                                selected_value={selected_date_range.value}
                                onChange={onDateRangeChange}
                            />
                        </div>
                        <div className='composite-calendar-modal__custom-date-range'>
                            <DatePicker
                                className='composite-calendar-modal__custom-date-range-start-date'
                                is_nativepicker
                                placeholder={localize('Start date')}
                                value={from}
                                max_date={max_date}
                                onChange={e => selectDate(e, 'from')}
                            />
                            <DatePicker
                                className='composite-calendar-modal__custom-date-range-end-date'
                                is_nativepicker
                                placeholder={localize('End date')}
                                value={to}
                                max_date={today}
                                min_date={min_date}
                                onChange={e => selectDate(e, 'to')}
                            />
                        </div>
                    </div>
                    <Button
                        className='composite-calendar-modal__actions-today'
                        text={localize('Back to today')}
                        onClick={selectToday}
                        has_effect
                        tertiary
                        large
                    />
                </div>
            </MobileDialog>
        </React.Fragment>
    );
};
CompositeCalendarMobile.propTypes = {
    current_focus: PropTypes.string,
    duration_list: PropTypes.array,
    input_date_range: PropTypes.object,
    onChange: PropTypes.func,
    setCurrentFocus: PropTypes.func,
};

export default React.memo(CompositeCalendarMobile);
