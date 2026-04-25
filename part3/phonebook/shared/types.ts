export interface PersonType {
  name: string;
  id: string;
  number: string;
}

export type NewPersonType = Omit<PersonType, "id">;

export interface NotificationMessage {
  message: string;
  error?: boolean;
}
