namespace hotel_management_system.models
{
    public class Room
    {
        public int RoomId { get; set; }
        public string RoomNO { get; set; } = string.Empty;
        public string RoomType { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Capacity { get; set; }
        public bool IsAvailable { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}