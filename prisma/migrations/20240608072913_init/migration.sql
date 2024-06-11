-- CreateTable
CREATE TABLE "FormData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNo" INTEGER NOT NULL,
    "supplierName" TEXT NOT NULL,
    "farmerName" TEXT NOT NULL,
    "typeItem" TEXT NOT NULL,
    "nug" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "vclNo" TEXT NOT NULL,
    "freightRate" REAL NOT NULL,
    "otherCharge" REAL NOT NULL,
    "labourRate" REAL NOT NULL,
    "weight" TEXT
);
