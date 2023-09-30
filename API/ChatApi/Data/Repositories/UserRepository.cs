using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChatApi.Data.Context;
using ChatApi.DTOs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ChatContext _context;
        private readonly IMapper _mapper;
        public UserRepository(ChatContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddUser(User user)
        {
            _context.Add(user);
        }

        public void Delete(User user)
        {
            _context.Remove(user);
        }

        public async Task<MemberDTO> GetMemberByUsernameAsync(string username)
        {
            return await _context.Users.Where(u => u.UserName == username.Trim())
                        .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();

        }

        public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
        {
            return await _context.Users.
                    ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.Where(u => u.Id == id)
                            .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Where(u => u.UserName == username.Trim())
                            .FirstOrDefaultAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
            _context.Update(user);
        }

        public async Task<bool> UserExists(int id)
        {
            return await _context.Users.Where(u => u.Id == id).AnyAsync();
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.Where(u => u.UserName == username.Trim())
                                .AnyAsync();
        }
    }
}