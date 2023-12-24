-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "typeOfMould" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "neelDesign" TEXT NOT NULL,
    "sideDesign" TEXT NOT NULL,
    "soleDesign" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "plateDrawingAndSize" TEXT NOT NULL,
    "nakkaFitting" TEXT NOT NULL,
    "expansion" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderUpdateDetails" (
    "id" TEXT NOT NULL,
    "orderDetailsId" TEXT,

    CONSTRAINT "OrderUpdateDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderImages" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "orderDetailsId" TEXT NOT NULL,

    CONSTRAINT "OrderImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetails_code_key" ON "OrderDetails"("code");

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderUpdateDetails" ADD CONSTRAINT "OrderUpdateDetails_orderDetailsId_fkey" FOREIGN KEY ("orderDetailsId") REFERENCES "OrderDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderImages" ADD CONSTRAINT "OrderImages_orderDetailsId_fkey" FOREIGN KEY ("orderDetailsId") REFERENCES "OrderDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
