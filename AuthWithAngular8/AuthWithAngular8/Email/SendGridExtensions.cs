using AuthWithAngular8.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWithAngular8.Email
{
    public static class SendGridExtensions
    {
        public static IServiceCollection AddSendGridEmailSendser(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, SendGridEmailSender>();

            return services;
        }
    }
}
