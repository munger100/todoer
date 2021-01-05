enum IReminder {
  hour,
  day,
  week,
}

export interface ITask {
  id: string;
  label: string;
  reminder?: IReminder;
  deadline?: Date;
  completed: boolean;
}

export interface ICreateTaskPayload {
  label: string;
  reminder?: IReminder;
  deadline?: Date;
}
