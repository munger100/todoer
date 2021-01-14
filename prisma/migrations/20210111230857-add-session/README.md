# Migration `20210111230857-add-session`

This migration has been generated at 1/11/2021, 11:08:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Session" (
"token" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("token")
)

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201230003614-initial..20210111230857-add-session
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
@@ -17,8 +17,15 @@
     password String
     name String
 }
+model Session {
+  token String @id
+
+  user User @relation(fields: [userId])
+  userId String
+}
+
 model Board {
     id String @id @default(uuid())
     name String
```


