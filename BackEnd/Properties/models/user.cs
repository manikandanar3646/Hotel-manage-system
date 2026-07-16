namespace hotel_management_system.models
{
    public class User
    {
        public int UserId { get; set; }

        public string Fullname { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}