using System.ComponentModel.DataAnnotations;

namespace Dynatron.Models;

public class Customer
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "{0} length must be between {2} and {1}.")]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "{0} length must be between {2} and {1}.")]
    public string LastName { get; set; }

    // MWN : If I was not using a simple in-memory db, we would want to apply a unique constraint to this
    //       field in order to prevent duplicate customers.  People can share names however not an email.
    [EmailAddress]
    public string Email { get; set; }

    public DateTime CreatedDateTimeUTC { get; set; }

    public DateTime LastUpdatedDateTimeUTC { get; set; }

    public Customer(string firstName, string lastName, string email)
    {
        Id = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        CreatedDateTimeUTC = DateTime.UtcNow;
        LastUpdatedDateTimeUTC = DateTime.UtcNow;
    }
    
}