using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using MimeKit;

namespace Emailer
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public IFormFileCollection Attachments { get; set; }

        public Message(IEnumerable<string> to, string subject, string content, IFormFileCollection attachments)
        {
            To = new List<MailboxAddress>();

            To.AddRange(to.Select(address => new MailboxAddress(address)));
            Subject = subject;
            Content = content;
            Attachments = attachments;
        }
    }
}