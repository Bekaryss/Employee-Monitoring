using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EndTermApp.ViewModel
{
    public class ReportViewModel
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public int LateCount { get; set; }
        public int MissCount { get; set; }
        public int EarlyLeaveCount { get; set; }
        public string TotalWorkHour { get; set; }
        public string Overhours { get; set; }
        public int Week { get; set; }
        public int Day { get; set; }
    }
}
