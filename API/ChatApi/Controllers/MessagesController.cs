using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ChatApi.DTOs;
using ChatApi.Hubs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<ChatHub> _hubContext;
        public MessagesController(IMessageRepository messageRepository,
                                    IMapper mapper,
                                    IUserRepository userRepository,
                                    IHubContext<ChatHub> hubContext)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _messageRepository = messageRepository;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessages()
        {
            var messages = await _messageRepository.GetMessagesAsync();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(messages);
        }

        [HttpGet("user/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>>
            GetMessagesFromUser(string username)
        {
            var messages = await _messageRepository.GetMessagesFromUserAsync(username);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(messages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MessageDTO>> GetMessage(int id)
        {
            if (!await _messageRepository.MessageExists(id))
                return BadRequest("Message does not exist");

            var message = await _messageRepository.GetMessageAsync(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(message);
        }

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> AddMessage(PostMessageDTO messageDTO)
        {
            if (messageDTO.Text.Trim().Length == 0)
                return NoContent();

            var username = HttpContext.User.Claims.First(c =>
                    c.Type == ClaimTypes.Name).Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var message = new Message
            {
                Text = messageDTO.Text.Trim(),
                User = user
            };

            _messageRepository.AddMessage(message);

            if (!await _messageRepository.SaveAsync())
            {
                ModelState.AddModelError("", "Something went wrong while creating.");
                return StatusCode(500, ModelState);

            }

            await _hubContext.Clients.All.SendAsync("ReceiveMessage", "New Message",
                 message.User.UserName, message.Text);

            return _mapper.Map<MessageDTO>(message);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            if (!await _messageRepository.MessageExists(id))
                return BadRequest("Message does not exist");

            var username = HttpContext.User.Claims.First(c =>
                    c.Type == ClaimTypes.Name).Value;

            var messageToDelete = _mapper.Map<Message>(
                await _messageRepository.GetMessageAsync(id)
            );

            if (!(messageToDelete.User.UserName == username))
                return Unauthorized("Can not delete message that's not yours");

            _messageRepository.DeleteMessage(messageToDelete);

            if (!await _messageRepository.SaveAsync())
                return BadRequest("Error while saving");

            return NoContent();
        }
    }
}