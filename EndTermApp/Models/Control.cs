using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EndTermApp.Models
{
    public class Control
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Day { get; set; }
        public int Week { get; set; }
    }
}
