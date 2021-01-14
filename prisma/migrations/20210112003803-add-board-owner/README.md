# Migration `20210112003803-add-board-owner`

This migration has been generated at 1/12/2021, 12:38:03 AM.
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

CREATE TABLE "public"."Session" (
"token" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("token")
)

CREATE TABLE "public"."Board" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"color" text   ,
"ownerId" text   NOT NULL ,
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

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Board" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("assigneeId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("boardId")REFERENCES "public"."Board"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210111230857-add-session..20210112003803-add-board-owner
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -31,8 +31,11 @@
     name String
     color String?
     tasks Task[]
+
+    owner User @relation(fields: [ownerId])
+    ownerId String
 }
 enum Reminder {
     hour
```


