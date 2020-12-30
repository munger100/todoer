# Migration `20201230003614-initial`

This migration has been generated at 12/30/2020, 12:36:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Reminder" AS ENUM ('hour', 'day', 'week')

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Board" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"color" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Task" (
"id" text   NOT NULL ,
"label" text   NOT NULL ,
"reminder" "Reminder"  ,
"deadline" timestamp(3)   ,
"completed" boolean   NOT NULL ,
"assigneeId" text   NOT NULL ,
"boardId" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("assigneeId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("boardId")REFERENCES "public"."Board"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201230003614-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,48 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+    id String @id @default(uuid())
+
+    email String @unique
+    password String
+    name String
+}
+
+model Board {
+    id String @id @default(uuid())
+
+    name String
+    color String?
+
+    tasks Task[]
+}
+
+enum Reminder {
+    hour
+    day
+    week
+}
+
+model Task {
+    id String @id @default(uuid())
+    label String
+
+    reminder Reminder?
+
+    deadline DateTime?
+    completed Boolean
+
+    assignee User @relation(fields: [assigneeId])
+    assigneeId String
+}
+
```


