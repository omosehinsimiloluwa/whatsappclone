create table users (
  id uuid primary key default gen_random_uuid(),
  phone_number text unique not null,
  display_name text not null,
  avatar_url text,
  about text,
  last_seen timestamptz,
  created_at timestamptz default now()
);

create table chats (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('direct', 'group')),
  name text,
  avatar_url text,
  created_by uuid references users(id),
  created_at timestamptz default now()
);

create table chat_participants (
  chat_id uuid references chats(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text default 'member',
  joined_at timestamptz default now(),
  last_read_message_id uuid,
  primary key (chat_id, user_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references chats(id) on delete cascade,
  sender_id uuid not null references users(id),
  reply_to_id uuid references messages(id),
  content text,
  message_type text default 'text',
  media_url text,
  created_at timestamptz default now()
);

create table message_receipts (
  message_id uuid references messages(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  status text not null check (status in ('sent', 'delivered', 'read')),
  updated_at timestamptz default now(),
  primary key (message_id, user_id)
);
