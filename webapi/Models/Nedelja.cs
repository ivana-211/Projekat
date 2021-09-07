using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    [Table("Vezbanje")]
    public class Nedelja
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime {get; set;}
        
        public virtual List<Dan> Dani {get; set;}
    }
} 