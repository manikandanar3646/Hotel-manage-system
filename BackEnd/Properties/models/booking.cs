namespace hotel_management_system.models
{
    public class Booking
    {
        public int BookingId { get; set; }

        public int UserId { get; set; }

        public int RoomId { get; set; }

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public decimal TotalAmount { get; set; }

        public string BookingStatus { get; set; } = string.Empty;
    }
}