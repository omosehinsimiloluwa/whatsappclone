# WhatsApp database schema (Task 1)

```mermaid
erDiagram
  USERS ||--o{ CHAT_PARTICIPANTS : joins
  CHATS ||--o{ CHAT_PARTICIPANTS : has
  CHATS ||--o{ MESSAGES : contains
  USERS ||--o{ MESSAGES : sends
  MESSAGES ||--o{ MESSAGE_RECEIPTS : tracks
  USERS ||--o{ MESSAGE_RECEIPTS : receives
  USERS {
    uuid id PK
    string phone_number UK
    string display_name
    string avatar_url
    string about
    timestamp last_seen
    timestamp created_at
  }
  CHATS {
    uuid id PK
    string type
    string name
    string avatar_url
    uuid created_by FK
    timestamp created_at
  }
  CHAT_PARTICIPANTS {
    uuid chat_id PK, FK
    uuid user_id PK, FK
    string role
    timestamp joined_at
    uuid last_read_message_id
  }
  MESSAGES {
    uuid id PK
    uuid chat_id FK
    uuid sender_id FK
    uuid reply_to_id FK
    string content
    string message_type
    string media_url
    timestamp created_at
  }
  MESSAGE_RECEIPTS {
    uuid message_id PK, FK
    uuid user_id PK, FK
    string status
    timestamp updated_at
  }
```

## Relationships
- users and chats are many-to-many, resolved by the `chat_participants` junction table.
- chats to messages: one-to-many.
- users to messages: one-to-many (a user sends many messages).
- messages to message_receipts: one-to-many (one status per recipient, needed for groups).
- `messages.reply_to_id` points back to another message (reply feature).
