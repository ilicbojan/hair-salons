using System;

namespace Application.Common.Exceptions
{
  // when getting entity from database, then check if it is null, if it is null 
  public class NotFoundException : Exception
  {
    public NotFoundException(string name, object key)
        : base($"Entity \"{name}\" ({key}) was not found.")
    {
    }
  }
}