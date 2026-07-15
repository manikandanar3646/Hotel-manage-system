namespace hotel_management_system.models
{
    public class ContactMessage
    {
        public int MessageId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}