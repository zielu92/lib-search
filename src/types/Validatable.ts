export interface Validatable {
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  }