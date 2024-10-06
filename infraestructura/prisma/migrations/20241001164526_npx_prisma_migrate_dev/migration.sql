-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "shoppingCarId" INTEGER,
    "orderId" INTEGER,
    CONSTRAINT "Products_shoppingCarId_fkey" FOREIGN KEY ("shoppingCarId") REFERENCES "Shopping_car" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "method" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "Payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "shoppingCarId" INTEGER,
    CONSTRAINT "Orders_shoppingCarId_fkey" FOREIGN KEY ("shoppingCarId") REFERENCES "Shopping_car" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shopping_car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_orderId_key" ON "Payments"("orderId");
