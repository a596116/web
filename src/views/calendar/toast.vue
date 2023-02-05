<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <div class="flex items-center gap-6 my-4">
        <el-select
          v-model="selectedView"
          :collapse-tags="true"
          @change="changMode"
          class="border border-slate-500 rounded-md w-auto!"
          placeholder="Select">
          <el-option v-for="item in viewOptions" :key="item.value" :value="item.value" />
        </el-select>
        <div class="buttons">
          <el-button type="primary" @click="onClickTodayButton" round>Today</el-button>
          <el-button type="info" @click="onClickMoveButton(-1)" round>
            <icon-left theme="outline" />
          </el-button>
          <el-button type="info" @click="onClickMoveButton(1)" round>
            <icon-right theme="outline" />
          </el-button>
        </div>
        <span class="text-lg">{{ dateRangeText }}</span>
      </div>
      <div id="calendar" style="height: 800px"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// npm i --save @toast-ui/calendar tui-date-picker tui-date-picker
import Calendar from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import 'tui-date-picker/dist/tui-date-picker.min.css'
import 'tui-time-picker/dist/tui-time-picker.min.css'
import { theme } from './theme'

const selectedView = ref('month')
const viewOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
]

let calendar: Calendar
nextTick(() => {
  // 初始化
  calendar = new Calendar('#calendar', {
    defaultView: 'month',
    isReadOnly: false,
    useDetailPopup: true,
    useFormPopup: true,
    theme: theme,
    gridSelection: true,
    calendars: [
      {
        id: '1',
        name: '生日',
        backgroundColor: '#9e5fff',
        borderColor: '#9e5fff',
        dragBackgroundColor: '#9e5fff',
      },
      {
        id: '2',
        name: '工作',
        backgroundColor: '#00a9ff',
        borderColor: '#00a9ff',
        dragBackgroundColor: '#00a9ff',
      },
    ],
    week: {
      narrowWeekend: true,
      showTimezoneCollapseButton: true,
      timezonesCollapsed: false,
      eventView: true,
      taskView: true,
    },
    month: {
      startDayOfWeek: 1,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    },
    timezone: {
      zones: [
        {
          timezoneName: 'Asia/Seoul',
          displayLabel: 'Seoul',
          tooltip: 'UTC+09:00',
        },
      ],
    },
    template: {
      milestone: function (event) {
        return `⛩️<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`
      },
      allday(event) {
        return `🔥<span style="color: red;">${event.title}</span>`
      },
      task(event) {
        return `🧰${event.start.getHours()}:${event.start.getMinutes()} <span style="color: #fff; background-color: ${
          event.backgroundColor
        };">${event.title}</span>`
      },
      time(event) {
        return `⏱️${event.start.getHours()}:${event.start.getMinutes()} <span style="color: #fff; background-color: ${
          event.backgroundColor
        };">${event.title}</span>`
      },
      goingDuration(event) {
        return `<span>${event.goingDuration}</span>`
      },
      popupUpdate() {
        return '更新'
      },
      popupEdit() {
        return '編輯'
      },
      popupDelete() {
        return '刪除'
      },
    },
  })
  /**
   * on 事件
   */
  calendar.on('beforeCreateEvent', (eventData: any) => {
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: (eventData.isAllday ? 'allday' : 'time') as
        | 'milestone'
        | 'task'
        | 'allday'
        | 'time',
      dueDateClass: '',
      attendees: ['haodai'],
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
    }
    calendar.createEvents([event])
  })

  calendar.on('beforeUpdateEvent', (updateData: any) => {
    const targetEvent = updateData.event
    const changes = { ...updateData.changes }
    calendar.updateEvent(targetEvent.id, targetEvent.calendarId, changes)
  })

  calendar.on('beforeDeleteEvent', (event: any) => {
    calendar.deleteEvent(event.id, event.calendarId)
  })

  calendar.on('clickTimezonesCollapseBtn', () => {
    const newTheme = {
      'week.daygridLeft.width': '100px',
      'week.timegridLeft.width': '100px',
    }
    calendar.setTheme(newTheme)
  })

  /**
   * 預設事件
   */
  calendar.createEvents([
    {
      id: '1',
      calendarId: '1',
      title: '測試事件',
      category: 'milestone',
      dueDateClass: '',
      attendees: ['haodai'],
      start: '2022-11-18T22:30:00+09:00',
      end: '2022-11-19T02:30:00+09:00',
    },
    {
      id: '2',
      calendarId: '2',
      title: '活動日',
      category: 'time',
      dueDateClass: '',
      attendees: ['haodai'],
      start: '2022-11-10T17:30:00+09:00',
      end: '2022-11-13T17:31:00+09:00',
    },
  ])
  setDateRangeText()
})

const dateRangeText = ref('')
const setDateRangeText = () => {
  const date = calendar.getDate()
  const start = calendar.getDateRangeStart()
  const end = calendar.getDateRangeEnd()

  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  switch (selectedView.value) {
    case 'month':
      dateRangeText.value = `${date.getFullYear()}.${date.getMonth() + 1}`

      return
    case 'day':
      dateRangeText.value = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`

      return
    default:
      dateRangeText.value = `${startYear}.${start.getMonth() + 1}.${start.getDate()} - ${
        startYear !== endYear ? `${endYear}.` : ''
      }${end.getMonth() + 1}.${end.getDate()}`
  }
}

const onClickTodayButton = () => {
  calendar.today()
  setDateRangeText()
}

const onClickMoveButton = (offset: any) => {
  calendar.move(offset)
  setDateRangeText()
}

const changMode = (v: 'month' | 'week' | 'day') => {
  calendar.changeView(v)
  setDateRangeText()
}
</script>
