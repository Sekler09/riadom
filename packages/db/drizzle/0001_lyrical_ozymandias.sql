ALTER TABLE "user" ADD COLUMN "tg_username" text;--> statement-breakpoint
CREATE UNIQUE INDEX "user_tg_username_uidx" ON "user" USING btree ("tg_username") WHERE "user"."tg_username" is not null;