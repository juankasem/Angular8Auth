using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWithAngular8.Helpers
{
    public class AppSettings
    {
        public string Site { get; set; }
        public string Audience { get; set; }
        public string ExpiryTime { get; set; }
        public string Secret { get; set; }
        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }
    }
}
