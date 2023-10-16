using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BCrypt.Net;
using ChatApi.DTOs;
using ChatApi.Interfaces;
using ChatApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
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
            if (await _userRepository.UserExists(register.UserName.Trim()
                .ToLower()))
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

            return Ok(userToReturn);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(RegisterDTO login)
        {
            if (!await _userRepository.UserExists(login.UserName.Trim()
                .ToLower()))
            {
                return Unauthorized("Account does not exist");
            }

            var user = await _userRepository.GetUserByUsernameAsync(
                login.UserName.Trim().ToLower());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!BCrypt.Net.BCrypt.EnhancedVerify(
                login.Password, user.HashedPassword))
                return Unauthorized("Incorrect Password");

            await HttpContext.SignInAsync("default", new ClaimsPrincipal(
                new ClaimsIdentity(
                    new Claim[]{
                        new Claim(ClaimTypes.Name, login.UserName)
                    },
                    "default"
                )
            ),
            new AuthenticationProperties()
            {
                IsPersistent = true,
            });

            return Ok("Successful login");

        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync("default");

            return Ok("Logged out successfully");
        }
    }
}