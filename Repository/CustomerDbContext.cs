using Microsoft.EntityFrameworkCore;
using Dynatron.Models;

namespace Dynatron.Repository;

public class CustomerDbContext : DbContext
{
    public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.Entity<Customer>().HasData(
               new Customer("matt", "newman", "mnewman@dynatron.com"),
               new Customer("kyle", "busch", "kbusch@dynatron.com"),
               new Customer("chase", "elliot", "celliot@dynatron.com"),
               new Customer("jeff", "gordon", "jgordon@dynatron.com"),
               new Customer("austin", "dillon", "adillon@dynatron.com"),
               new Customer("noah", "gragson", "ngragson@dynatron.com"),
               new Customer("denny", "hamlin", "dhamlin@dynatron.com"),
               new Customer("joey", "logano", "jlogano@dynatron.com"),
               new Customer("bubba", "wallace", "bwallace@dynatron.com"),
               new Customer("erik", "jones", "ejones@dynatron.com"),

               new Customer("ty", "gibbs", "tgibbs@dynatron.com"),
               new Customer("justin", "haley", "jhaley@dynatron.com"),
               new Customer("zane", "smith", "zsmith@dynatron.com"),
               new Customer("alex", "bowman", "abowman@dynatron.com"),
               new Customer("tyler", "reddick", "treddick@dynatron.com"),
               new Customer("ryan", "preece", "rpreece@dynatron.com"),
               new Customer("daniel", "hermic", "dhermic@dynatron.com"),
               new Customer("harrison", "burton", "hburton@dynatron.com"),
               new Customer("christopher", "bell", "cbell@dynatron.com"),
               new Customer("chase", "briscoe", "cbriscoe@dynatron.com")
        );
    }

    public DbSet<Customer> Customers { get; set; } = null!;
}