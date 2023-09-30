using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using ChatApi.DTOs;
using ChatApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberByUsernameAsync(string username);
        Task<bool> SaveAsync();
        void Update(User user);
        void Delete(User user);
        Task<bool> UserExists(int id);
        Task<bool> UserExists(string username);
        void AddUser(User user);
    }
}