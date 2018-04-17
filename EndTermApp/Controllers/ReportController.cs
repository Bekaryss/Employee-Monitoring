using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EndTermApp.Data;
using EndTermApp.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EndTermApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Report")]
    public class ReportController : Controller
    {
        private readonly MyContext _context;

        public ReportController(MyContext context)
        {
            _context = context;
        }
        // GET: api/Report
        [HttpGet]
        public IEnumerable<ReportViewModel> Get()
        {
            var employees = _context.Employees.ToList();
            var controls = _context.Controls.ToList();

            List<int> month = new List<int>()
            {
                1,2,3,4,5
            };
            List<ReportViewModel> reports = new List<ReportViewModel>();

            foreach (var weekItem in month)
            {
                var weeks = controls.Where(p => p.Week == weekItem).ToList();
                if(weeks.Count != 0)
                {
                    ReportViewModel rvm = new ReportViewModel();
                    rvm.Week = weeks.FirstOrDefault().Week;
                    rvm.EmployeeId = weeks.FirstOrDefault().EmployeeId;
                    rvm.FullName = employees.Where(e => e.Id == weeks.FirstOrDefault().EmployeeId).FirstOrDefault().FullName;
                    reports.Add(rvm);
                }
            }

            foreach(var reportItem in reports)
            {
                var currentReportControls = controls.Where(e => e.EmployeeId == reportItem.EmployeeId).Where(c => c.Week == reportItem.Week);
                reportItem.Day = currentReportControls.Count();
                var employeeItem = employees.Find(p => p.Id == reportItem.EmployeeId);
                int miss = employeeItem.DayCount - reportItem.Day;
                if(miss > 0)
                {
                    reportItem.MissCount = miss;
                }
                else
                {

                }
                int earlyLeaveCount = 0;
                int lateCount = 0;
                foreach (var item in currentReportControls.ToList())
                {
                    if(item.EndTime < employeeItem.EndTime)
                    {
                        earlyLeaveCount++;
                    }
                    if(item.StartTime > employeeItem.StartTime)
                    {
                        lateCount++;
                    }
                }
                reportItem.EarlyLeaveCount = earlyLeaveCount;
                reportItem.LateCount = lateCount;
            }
            //foreach (var item in employees)
            //{
            //    var controlList = controls.Where(p => p.EmployeeId == item.Id).ToList();
 
            //    foreach(var weekItem in month)
            //    {
            //        var weeks = controlList.Where(p => p.Week == weekItem).ToList();

            //    }

            //    foreach (var element in controlList)
            //    {
                    
            //    }
            //}
            return reports;
        }
    }
}
