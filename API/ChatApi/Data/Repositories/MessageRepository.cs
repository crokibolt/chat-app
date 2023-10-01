using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatApi.Data.Context;
using ChatApi.DTOs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ChatContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(ChatContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddMessage(Message message)
        {
            _context.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Remove(message);
        }

        public async Task<MessageDTO> GetMessageAsync(int id)
        {
            var message = await _context.Messages.Where(m => m.Id == id)
                                    .Include(m => m.User)
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync();
            var messageToReturn = _mapper.Map<MessageDTO>(message);

            return messageToReturn;
        }

        public async Task<IEnumerable<MessageDTO>> GetMessagesAsync()
        {
            var messages = await _context.Messages.Include(m => m.User).ToListAsync();
            var messagesToReturn = _mapper.Map<List<MessageDTO>>(messages);

            return messagesToReturn;
        }

        public async Task<IEnumerable<MessageDTO>> GetMessagesFromUserAsync(string username)
        {
            var messages = await _context.Messages
                .Where(m => m.User.UserName == username.Trim().ToLower())
                .Include(m => m.User)
                .ToListAsync();

            var messagesToReturn = _mapper.Map<List<MessageDTO>>(messages);

            return messagesToReturn;
        }

        public async Task<bool> MessageExists(int id)
        {
            return await _context.Messages.Where(m => m.Id == id).AnyAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}