-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT,
    "birthday" DATETIME NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "newsletter_register" BOOLEAN DEFAULT false,
    "country_id" TEXT,
    "phone" TEXT,
    "details" TEXT,
    "hobbies" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "country_prefix" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_prefix_key" ON "countries"("country_prefix");
