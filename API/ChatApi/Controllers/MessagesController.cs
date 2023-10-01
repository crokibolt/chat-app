using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatApi.DTOs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatApi.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        public MessagesController(IMessageRepository messageRepository,
                                    IMapper mapper,
                                    IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _messageRepository = messageRepository;
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
        public async Task<ActionResult<MessageDTO>> AddMessage(PostMessageDTO postMessage)

        {
            if (!await _userRepository.UserExists(postMessage.Username.ToLower()))
                return BadRequest("User does not exist");

            var user = await _userRepository.GetUserByUsernameAsync(postMessage.Username.ToLower());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var message = new Message
            {
                Text = postMessage.Text.Trim(),
                User = user
            };

            _messageRepository.AddMessage(message);

            if (!await _messageRepository.SaveAsync())
            {
                ModelState.AddModelError("", "Something went wrong while creating.");
                return StatusCode(500, ModelState);

            }

            return _mapper.Map<MessageDTO>(message);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            if (!await _messageRepository.MessageExists(id))
                return BadRequest("Message does not exist");

            var messageToDelete = _mapper.Map<Message>(
                await _messageRepository.GetMessageAsync(id)
            );

            _messageRepository.DeleteMessage(messageToDelete);

            if (!await _messageRepository.SaveAsync())
                return BadRequest("Error while saving");

            return NoContent();
        }
    }
}