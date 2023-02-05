// import type { EventInput } from '@fullcalendar/vue3'

// 事件Uid初始化
let eventGuid = 0
/**
 * @description 日期字符串格式化
 */
const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today
/**
 * @description 事件Uid
 */
export function createEventId() {
    return String(eventGuid++)
}
/**
 * @description 初始化事件对象
 */
export const INITIAL_EVENTS: any = [
    {
        id: createEventId(),
        title: "全天安排",
        start: todayStr,
    },
    {
        id: createEventId(),
        title: "拜訪1",
        start: `${todayStr} 12:00:00`,
        position: "123",
    },
    {
        id: createEventId(),
        title: "拜訪2",
        start: "2022-11-11 12:00:00",
        end: "2022-11-11 17:00:00",
        position: "123",
    },
    {
        id: createEventId(),
        title: "拜訪2",
        start: "2022-11-01 12:00:00",
        end: "2022-11-01 17:00:00",
    },
    {
        id: createEventId(),
        title: "拜訪2",
        start: "2022-11-27 12:00:00",
        end: "2022-11-27 17:00:00",
        position: "123",
    },
    {
        id: createEventId(),
        title: "拜訪2",
        start: "2022-12-07 12:00:00",
        end: "2022-12-07 17:00:00",
        position: "123",
    },
    {
        id: createEventId(),
        title: "拜訪2",
        start: "2022-12-17 12:00:00",
        end: "2022-12-17 17:00:00",
        position: "123",
    },
    {
        id: createEventId(),
        title: "Test",
        start: "2023-01-17 12:00:00",
        end: "2023-01-17 17:00:00",
        position: "Test",
    },
]