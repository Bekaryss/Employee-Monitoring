using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EndTermApp.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string IIN { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [Range(1, 7)]
        public int DayCount { get; set; }
    }
}
