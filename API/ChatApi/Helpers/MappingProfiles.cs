using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatApi.DTOs;
using ChatApi.Models;

namespace ChatApi.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, MemberDTO>().ReverseMap();
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, SenderDTO>().ReverseMap();
            CreateMap<Message, MessageDTO>().ReverseMap();
        }
    }
}