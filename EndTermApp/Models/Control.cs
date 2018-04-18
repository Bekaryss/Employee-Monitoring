using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Range(1, 7)]
        public int Day { get; set; }
        [Range(1, 5)]
        public int Week { get; set; }
    }
}
