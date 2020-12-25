using Application.Images;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;


namespace Application.Common.Interfaces
{
    public interface IImageService
    {
        ImageUploadResultCustom AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}
