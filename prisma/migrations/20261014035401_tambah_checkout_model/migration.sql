-- CreateTable
CREATE TABLE "Checkout" (
    "id" SERIAL NOT NULL,
    "orderid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product" JSONB NOT NULL,
    "totalproduct" TEXT NOT NULL,
    "point" TEXT,
    "ongkir" INTEGER,
    "city" TEXT,
    "province" TEXT,
    "profile_id" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "kurir" TEXT NOT NULL,
    "estimasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
