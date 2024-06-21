/*
  Warnings:

  - You are about to alter the column `cut` on the `FormData` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNo" INTEGER,
    "supplierName" TEXT,
    "farmerName" TEXT,
    "lot" TEXT,
    "typeItem" TEXT,
    "cut" REAL,
    "cNug" INTEGER,
    "sNug" INTEGER,
    "customerName" TEXT,
    "supplierRate" INTEGER,
    "customerRate" INTEGER,
    "itemName" TEXT,
    "date" DATETIME,
    "vclNo" TEXT,
    "freightRate" REAL,
    "otherCharge" REAL,
    "labourRate" REAL,
    "basicAmount" REAL,
    "bikariAmount" REAL,
    "avgWeight" REAL,
    "grossWeight" REAL,
    "netWeight" REAL,
    "weight" TEXT
);
INSERT INTO "new_FormData" ("cNug", "customerName", "customerRate", "cut", "date", "farmerName", "freightRate", "id", "itemName", "labourRate", "lot", "otherCharge", "sNug", "serialNo", "supplierName", "supplierRate", "typeItem", "vclNo") SELECT "cNug", "customerName", "customerRate", "cut", "date", "farmerName", "freightRate", "id", "itemName", "labourRate", "lot", "otherCharge", "sNug", "serialNo", "supplierName", "supplierRate", "typeItem", "vclNo" FROM "FormData";
DROP TABLE "FormData";
ALTER TABLE "new_FormData" RENAME TO "FormData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
