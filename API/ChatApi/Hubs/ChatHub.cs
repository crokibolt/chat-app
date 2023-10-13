using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var username = Context?.User?.Claims.First(c =>
                    c.Type == ClaimTypes.Name).Value;

            await Clients.All.SendAsync("ReceiveMessage", "New user",
                $"{username} has joined.");
        }
    }
}