using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BCrypt.Net;
using ChatApi.DTOs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatApi.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AccountController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<SenderDTO>> Register(RegisterDTO register)
        {
            if (await _userRepository.UserExists(register.UserName))
            {
                return BadRequest("Username is taken");
            }

            var user = _mapper.Map<User>(register);

            user.UserName = register.UserName.Trim().ToLower();
            user.HashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(register.Password);

            _userRepository.AddUser(user);

            if (!await _userRepository.SaveAsync())
                return BadRequest("Error while saving");
            var userToReturn = new SenderDTO
            {
                Id = user.Id,
                UserName = user.UserName
            };

            return userToReturn;
        }
    }
}