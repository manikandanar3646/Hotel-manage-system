namespace hotel_management_system.models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public int BookingId { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;

        public string PaymentStatus { get; set; } = string.Empty;
    }
}
