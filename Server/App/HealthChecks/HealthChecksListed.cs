using System;
using System.Collections.Generic;

namespace App.HealthChecks
{
    public class HealthChecksListed
    {
        public string Status { get; set; }
        public IEnumerable<HealthCheck> Checks { get; set; }
        public TimeSpan Duration { get; set; }
    }
}