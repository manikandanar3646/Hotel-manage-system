namespace hotel_management_system.models
{
    public class User
    {
        public int UserId { get; set; }

        public string Fullname { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string Role { get; set; }
    }
}
