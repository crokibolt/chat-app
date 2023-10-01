using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApi.DTOs;
using ChatApi.Models;

namespace ChatApi.Interfaces
{
    public interface IMessageRepository
    {
        Task<IEnumerable<MessageDTO>> GetMessagesAsync();
        Task<IEnumerable<MessageDTO>> GetMessagesFromUserAsync(string username);
        Task<MessageDTO> GetMessageAsync(int id);
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<bool> SaveAsync();
        Task<bool> MessageExists(int id);
    }
}