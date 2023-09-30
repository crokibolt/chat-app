using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using BCrypt.Net;
using ChatApi.Data.Context;
using ChatApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data
{
    public class Seed
    {
        public static async Task SeedUsers(ChatContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<User>>(userData);

            foreach (var user in users)
            {

                user.UserName = user.UserName.ToLower();
                user.HashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword("Password", 13);
                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}