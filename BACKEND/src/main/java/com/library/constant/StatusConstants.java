package com.library.constant;

/**
 * Trạng thái khớp DB schema (CHECK constraint).
 */
public final class StatusConstants {

    private StatusConstants() {}

    public static final class Reader {
        private Reader() {}
        public static final String ACTIVE    = "Active";
        public static final String LOCKED    = "Locked";
        public static final String SUSPENDED = "Suspended";
        public static final String EXPIRED   = "Expired";
    }

    public static final class Book {
        private Book() {}
        public static final String AVAILABLE    = "Available";
        public static final String UNAVAILABLE  = "Unavailable";
        public static final String OUT_OF_STOCK = "OutOfStock";
    }

    public static final class BookCopy {
        private BookCopy() {}
        public static final String AVAILABLE = "Available";
        public static final String BORROWED  = "Borrowed";
        public static final String RESERVED  = "Reserved";
        public static final String LOST      = "Lost";
        public static final String DAMAGED   = "Damaged";
    }

    public static final class Borrow {
        private Borrow() {}
        public static final String BORROWED = "Borrowed";
        public static final String RETURNED = "Returned";
        public static final String OVERDUE  = "Overdue";
        public static final String RENEWED  = "Renewed";
        public static final String LOST     = "Lost";
    }

    public static final class Reservation {
        private Reservation() {}
        public static final String ACTIVE    = "Active";
        public static final String EXPIRED   = "Expired";
        public static final String CANCELLED = "Cancelled";
        public static final String COMPLETED = "Completed";
    }

    public static final class Fine {
        private Fine() {}
        public static final String UNPAID    = "Unpaid";
        public static final String PAID      = "Paid";
        public static final String PENDING   = "Pending Payment";
        public static final String CANCELLED = "Cancelled";
    }

    public static final class Staff {
        private Staff() {}
        public static final String ACTIVE   = "Active";
        public static final String INACTIVE = "Inactive";
    }
}