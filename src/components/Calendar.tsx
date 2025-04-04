import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js'
import "../calendar.css"
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({
  monthlyTransactions, 
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today
}: CalendarProps) => {
  
  // const events = [
  //   { title: 'Meeting', start: "2025-02-03", income: 600, expense: 300, balance: 300},
  //   { title: 'Meeting', start: "2025-02-07", income: 300, expense: 200, balance: 100 }
  // ]
 
// 月の取引データ 
  // const  monthlyTransactions = [
  //   {
  //     id: "a",
  //     type: "income",
  //     category: "副収入",
  //     amount: 20000,
  //     content: "配当金",
  //     date: "2025-02-10"
  //   },
  //   {
  //     id: "b",
  //     type: "expense",
  //     category: "食費",
  //     amount: 200,
  //     content: "玉ねぎ",
  //     date: "2025-02-10"
  //   },
  //   {
  //     id: "c",
  //     type: "expense",
  //     category: "日用品",
  //     amount: 2000,
  //     content: "電球",
  //     date: "2025-02-12"
  //   },
  // ]

  const theme = useTheme()

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log(dailyBalances)

  // 1.日付ごとの収支を計算する関数
  // const dailyBalances = {
  //   "2025-02-10": {income: 20000, expense: 200, balanace: 19800},
  //   "2025-02-12": {income: 0, expense: 2000, balanace: -2000},
  // }
 
  // 2.FullCalendar用のイベントを生成する関数
  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income), 
        expense: formatCurrency(expense), 
        balance: formatCurrency(balance)
      }
    }) 
  }
  const calendarEvents = (createCalendarEvents(dailyBalances))
  console.log(calendarEvents); 

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  }
  console.log([...calendarEvents, backgroundEvent]);

  

  // カレンダーイベントの見た目を作る関数 
  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo);
    // 上記のeventInfoからデベロッパーの情報が見つからなかった
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  // 月ごとのデータをカレンダーに表示する
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart
    console.log(datesetInfo.view.currentStart);
    setCurrentMonth(currentMonth);
    // 今日をクリックした時、今日の日付にする。
    // datesetInfoは月のみ取得するのでDateで日にちと月を取得させる
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };
  
  // カレンダー内のクリックした日付
  const handleDateClick = (dateInfo: DateClickArg) => {
    console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);  
  }


  return (
    <div>
      <FullCalendar
        // カレンダーを月で表示
        locale={jaLocale}
        // 月のカレンダーを表示
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={[...calendarEvents, backgroundEvent]}
        // 
        eventContent={renderEventContent}
        datesSet={handleDateSet}
        dateClick={handleDateClick}
      />
    </div>
  )
}

export default Calendar
