-- CreateTable
CREATE TABLE "Departure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "status" "DepartureStatus" NOT NULL DEFAULT 'PREPARING',

    CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
);
