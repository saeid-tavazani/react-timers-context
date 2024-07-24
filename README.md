

# مدیریت تایمرها با استفاده از React Context

این ریپازیتوری شامل یک مثال از مدیریت تایمرها با استفاده از React Context و useReducer است. کد این پروژه نحوه ایجاد یک context برای مدیریت چندین تایمر و ارائه توابعی برای افزودن، شروع و متوقف کردن تایمرها را نشان می‌دهد.

## فهرست مطالب

- [مقدمه](#مقدمه)
- [ویژگی‌ها](#ویژگی‌ها)
- [نصب](#نصب)
- [استفاده](#استفاده)
- [بررسی کد](#بررسی-کد)
  - [TimersContext](#TimersContext)
  - [useTimerContext](#useTimerContext)
  - [TimersContextProvider](#TimersContextProvider)
  - [timersReducer](#timersReducer)

## مقدمه

این پروژه روشی برای مدیریت چندین تایمر با استفاده از Context API و هوک useReducer در React را نشان می‌دهد. شامل تنظیم context، منطق reducer برای مدیریت وضعیت و اقدامات برای افزودن، شروع و متوقف کردن تایمرها است.

## ویژگی‌ها

- افزودن تایمرهای جدید با نام و مدت زمان مشخص.
- شروع تمامی تایمرها.
- متوقف کردن تمامی تایمرها.
- مدیریت وضعیت با استفاده از React Context و useReducer.



 ریپازیتوری را کلون کنید:
   ```sh
   git clone https://github.com/saeid-tavazani/react-timers-context.git
   ```


## بررسی کد

### TimersContext

کانتکست `TimersContext` برای مدیریت تایمرها فراهم شده است. شامل وضعیت اولیه و ساختار مقدار context است.

```javascript
const TimersContext = createContext<TimersContextValue | null>(null);
```

### useTimerContext

یک هوک سفارشی که به کامپوننت‌ها اجازه می‌دهد به context تایمرها دسترسی داشته باشند.

```javascript
export function useTimerContext() {
  const timerCtx = useContext(TimersContext);
  if (timerCtx === null) {
    throw new Error("Timers Context is null");
  }
  return timerCtx;
}
```

### TimersContextProvider

کامپوننت ارائه‌دهنده context که برنامه را در بر می‌گیرد و مقادیر context را به تمام کامپوننت‌های فرزند خود ارائه می‌دهد.


```javascript
export default function TimersContextProvider({ children }: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ContextValue: TimersContextValue = {
    isRunning: timersState.isRunning,
    timers: timersState.timers,
    addTimers(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMER" });
    },
  };

  return (
    <TimersContext.Provider value={ContextValue}>
      {children}
    </TimersContext.Provider>
  );
}
```

### timersReducer

تابع reducer که انتقال وضعیت‌ها بر اساس اقدامات ارسال شده را مدیریت می‌کند.

```javascript
function timersReducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    case "START_TIMER":
      return { ...state, isRunning: true };
    case "STOP_TIMER":
      return { ...state, isRunning: false };
    default:
      return state;
  }
}
```
