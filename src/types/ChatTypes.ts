import { UserType } from './UserTypes';

export interface LastMessageType {
  content: string;
  id: number;
  time: string;
}
export interface ChatType {
  avatar?: string;
  defaultAvatar?:string;
  created_by: number;
  id: string;
  last_message?: LastMessageType;
  title: string;
  unread_count: number | undefined;
}

export type ChatItemType = {
  chat: Array<ChatType>;
  active: Array<ChatType>;
  user: UserType;
  defaultAvatar: unknown;
};

export interface Message {
  classItem: string;
  classText: string;
  classDate: string;
  content: string;
  time: Date;
}

export interface DataMessage {
  chat_id: number;
  content: string;
  file?: any;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: string;
}

export type MessageItemType = {
  mess?: Array<Message>;
  active?: Array<ChatType>;
};

export interface DeleteChat {
  chatId: string;
}
export interface CreateChat {
  title: string;
}

export interface UserToChat {
  users: Array<string>;
  chatId: string;
}
