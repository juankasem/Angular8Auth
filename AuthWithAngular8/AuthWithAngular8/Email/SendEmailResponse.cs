using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWithAngular8.Email
{
    public class SendEmailResponse
    {
        public bool Successful => ErrorMessage == null;
        public string ErrorMessage { get; set; }
    }
}
