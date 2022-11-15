export const theme = {
    month: {
        dayName: {
            borderLeft: 'none',
            backgroundColor: 'rgba(51, 51, 51, 0.4)',
        },
        holidayExceptThisMonth: { color: '#f3acac' },
        dayExceptThisMonth: { color: '#bbb' },
        weekend: { backgroundColor: '#fafafa' },
        moreView: {
            border: '1px solid grey',
            boxShadow: '0 2px 6px 0 grey',
            backgroundColor: 'white',
            width: 320,
            height: 200,
        },
        moreViewTitle: { backgroundColor: '#f4f4f4' },

    },
    week: {
        dayName: {
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            borderLeft: '1px solid #ddd',
            backgroundColor: 'inherit',
        },
        today: {
            color: '#009688',
            backgroundColor: 'inherit',
        },
        pastDay: { color: '#999' },
        panelResizer: { border: '1px solid #ddd' },
        dayGrid: { borderRight: '1px solid #ddd' },
        dayGridLeft: {
            width: '100px',
            backgroundColor: '',
            borderRight: '1px solid #ddd',
        },
        weekend: { backgroundColor: 'inherit' },
        timeGridLeft: {
            width: '100px',
            backgroundColor: '#fafafa',
            borderRight: '1px solid #ddd',
        },
        timeGridLeftAdditionalTimezone: { backgroundColor: '#fdfdfd' },
        timeGridHourLine: { borderBottom: '1px solid #eee' },
        timeGridHalfHourLine: { borderBottom: '1px dotted #f9f9f9' },
        timeGrid: { borderRight: '1px solid #ddd' },
        nowIndicatorLabel: { color: '#135de6' },
        nowIndicatorPast: { border: '1px solid rgba(19, 93, 230, 0.3)' },
        nowIndicatorBullet: { backgroundColor: '#135de6' },
        nowIndicatorToday: { border: '1px solid #135de6' },
        nowIndicatorFuture: { border: '1px solid #135de6' },
        pastTime: { color: '#999' },
        futureTime: { color: '#333' },
        gridSelection: { color: '#135de6' },
    },
}