alter table messages enable row level security;

create policy "members can read messages in their chats"
on messages for select
using (
  chat_id in (
    select chat_id from chat_participants
    where user_id = auth.uid()
  )
);

create policy "members can send messages in their chats"
on messages for insert
with check (
  sender_id = auth.uid()
  and chat_id in (
    select chat_id from chat_participants
    where user_id = auth.uid()
  )
);
