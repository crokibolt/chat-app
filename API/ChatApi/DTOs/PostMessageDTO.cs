using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApi.DTOs
{
    public class PostMessageDTO
    {
        public string Username { get; set; }
        public string Text { get; set; }
    }
}