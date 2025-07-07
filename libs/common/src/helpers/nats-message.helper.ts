export interface NatsMessage<T = any> {
  id: string;
  timestamp: Date;
  service: string;
  pattern: string;
  data: T;
}

export interface NatsResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export function createNatsMessage<T>(
  service: string,
  pattern: string,
  data: T
): NatsMessage<T> {
  return {
    id: generateId(),
    timestamp: new Date(),
    service,
    pattern,
    data,
  };
}

export function createNatsResponse<T>(
  data?: T,
  error?: { code: string; message: string }
): NatsResponse<T> {
  return {
    success: !error,
    data,
    error,
  };
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}