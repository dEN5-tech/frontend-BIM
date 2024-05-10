export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  avatar: string;
}

export interface Message {
  id: number;
  userId: number;
  content: string;
  image?: string;
  document?: string;
}


export interface UserDTO {
    id: number;
    email: string;
    name: string;
    password: string;
    avatar: string;
}

export interface MessageDTO {
    user: {
        id: number;
        name: string;
        avatar: string;
    };
    content: string;
    image: string | null;
    document: string | null;
    id: number;
}

export interface DTOAxiosResponse {
    id: number;
    users: UserDTO[];
    messages: MessageDTO[];
}
