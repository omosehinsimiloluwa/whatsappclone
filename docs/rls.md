# Row Level Security (Task 3)

**RLS (Row Level Security)** is a database feature that controls which rows of a table
each user is allowed to read or change. The database itself enforces the rules, so even
if the app code asks for every row, the user only gets the rows they are allowed to see.

## Two uses

1. **Private chats in a messaging app.** A user can only read messages from chats they
   belong to, so nobody can read someone else's conversations.
2. **Multi-tenant apps.** Many companies share one database. Every table has a
   `company_id`, and a user can only see rows matching their own company.

See `rls.sql` for the policies.
