export interface Person {
  name: string;
  id: string;
  number: string;
}

export type NewPerson = Omit<Person, "id">;

export interface NotificationMessage {
  message: string;
  error?: boolean;
}
