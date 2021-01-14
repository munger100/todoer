enum IReminder {
  hour,
  day,
  week,
}

export interface ITask {
  id: string;
  label: string;
  completed: boolean;
}

export interface ICreateTaskPayload {
  id: string;
  label: string;
}
