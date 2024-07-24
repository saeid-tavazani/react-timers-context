import { createContext, useContext, useReducer, type ReactNode } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimerState & {
  addTimers: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const initialState: TimerState = {
  isRunning: false,
  timers: [],
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimerContext() {
  const timerCtx = useContext(TimersContext);
  if (timerCtx === null) {
    throw new Error("Timers Context is null");
  }
  return timerCtx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type AddTimerAction = {
  type: "ADD_TIMER";
  payload: Timer;
};
type StopTimerAction = {
  type: "STOP_TIMER";
};
type StartTimerAction = {
  type: "START_TIMER";
};

type Action = AddTimerAction | StopTimerAction | StartTimerAction;

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
      break;
    case "START_TIMER":
      return { ...state };
      break;
    case "STOP_TIMER":
      return { ...state, isRunning: false };
      break;
    default:
      return state;
  }
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
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
