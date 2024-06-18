/*
  Warnings:

  - You are about to drop the column `nug` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `typeItem` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `FormData` table. All the data in the column will be lost.

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
    "cut" INTEGER,
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
    "labourRate" REAL
);
INSERT INTO "new_FormData" ("customerName", "date", "farmerName", "freightRate", "id", "itemName", "labourRate", "otherCharge", "serialNo", "supplierName", "vclNo") SELECT "customerName", "date", "farmerName", "freightRate", "id", "itemName", "labourRate", "otherCharge", "serialNo", "supplierName", "vclNo" FROM "FormData";
DROP TABLE "FormData";
ALTER TABLE "new_FormData" RENAME TO "FormData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
