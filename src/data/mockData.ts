
import { Server, User } from '@/types/chat';

// Текущий пользователь
const currentUser: User = {
  id: 'user-1',
  username: 'Текущий Пользователь',
  avatar: '/placeholder.svg',
  status: 'online',
};

// Другие пользователи
const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    username: 'Антон Чехов',
    avatar: '/placeholder.svg',
    status: 'online',
  },
  {
    id: 'user-3',
    username: 'Иван Бунин',
    avatar: '/placeholder.svg',
    status: 'idle',
  },
  {
    id: 'user-4',
    username: 'Федор Достоевский',
    avatar: '/placeholder.svg',
    status: 'dnd',
  },
  {
    id: 'user-5',
    username: 'Лев Толстой',
    avatar: '/placeholder.svg',
    status: 'offline',
  },
];

// Серверы с каналами и сообщениями
const servers: Server[] = [
  {
    id: 'server-1',
    name: 'Общий Сервер',
    icon: '🏠',
    members: users,
    channels: [
      {
        id: 'channel-1',
        name: 'общий-чат',
        type: 'text',
        messages: [
          {
            id: 'msg-1',
            content: 'Привет всем! Как дела?',
            user: users[1],
            timestamp: '2023-12-01T12:00:00Z',
          },
          {
            id: 'msg-2',
            content: 'Привет! У меня всё отлично, спасибо!',
            user: users[2],
            timestamp: '2023-12-01T12:01:30Z',
          },
          {
            id: 'msg-3',
            content: 'Рад, что все собрались!',
            user: users[0],
            timestamp: '2023-12-01T12:02:45Z',
          },
        ],
      },
      {
        id: 'channel-2',
        name: 'помощь',
        type: 'text',
        messages: [
          {
            id: 'msg-4',
            content: 'Кто-нибудь может помочь с проектом?',
            user: users[3],
            timestamp: '2023-12-01T13:00:00Z',
          },
          {
            id: 'msg-5',
            content: 'Я могу посмотреть. В чем проблема?',
            user: users[0],
            timestamp: '2023-12-01T13:05:20Z',
          },
        ],
      },
      {
        id: 'channel-3',
        name: 'голосовой канал',
        type: 'voice',
        messages: [],
      },
    ],
  },
  {
    id: 'server-2',
    name: 'Разработка',
    icon: '💻',
    members: [users[0], users[1], users[3]],
    channels: [
      {
        id: 'channel-4',
        name: 'фронтенд',
        type: 'text',
        messages: [
          {
            id: 'msg-6',
            content: 'React или Vue - что выбрать для нового проекта?',
            user: users[1],
            timestamp: '2023-12-02T10:00:00Z',
          },
          {
            id: 'msg-7',
            content: 'Это зависит от требований проекта и опыта команды.',
            user: users[0],
            timestamp: '2023-12-02T10:15:00Z',
          },
        ],
      },
      {
        id: 'channel-5',
        name: 'бекенд',
        type: 'text',
        messages: [
          {
            id: 'msg-8',
            content: 'Кто-нибудь работал с GraphQL?',
            user: users[3],
            timestamp: '2023-12-02T11:30:00Z',
          },
        ],
      },
    ],
  },
  {
    id: 'server-3',
    name: 'Игры',
    icon: '🎮',
    members: [users[0], users[2], users[4]],
    channels: [
      {
        id: 'channel-6',
        name: 'minecraft',
        type: 'text',
        messages: [
          {
            id: 'msg-9',
            content: 'Кто хочет присоединиться к серверу Minecraft?',
            user: users[2],
            timestamp: '2023-12-03T19:00:00Z',
          },
          {
            id: 'msg-10',
            content: 'Я в деле! Отправь IP сервера.',
            user: users[0],
            timestamp: '2023-12-03T19:05:30Z',
          },
        ],
      },
      {
        id: 'channel-7',
        name: 'valorant',
        type: 'text',
        messages: [],
      },
    ],
  },
];

export const mockData = {
  currentUser,
  users,
  servers,
};
