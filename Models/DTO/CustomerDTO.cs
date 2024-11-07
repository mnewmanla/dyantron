using System.ComponentModel.DataAnnotations;

namespace Dynatron.Models;

public class CustomerDTO
{   public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public CustomerDTO(string firstName, string lastName, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }
    
}