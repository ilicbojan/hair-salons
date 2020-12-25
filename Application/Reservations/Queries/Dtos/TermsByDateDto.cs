using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Reservations.Queries.Dtos
{
    public class TermByDateDto
    {
        public TermByDateDto()
        {
            Terms = new List<TermDto>();
        }

        public DateTime Date { get; set; }
        public IList<TermDto> Terms { get; set; }
    }
}
