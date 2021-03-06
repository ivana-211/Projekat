using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Models
{
    [Table("Dani")]
    public class Dan
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Naziv")]
        [MaxLength(10)]
        public string Naziv {get; set;}

        public virtual List<Vezba> Vezbe {get; set;}

        [JsonIgnore]
        public Nedelja Nedelja {get; set;}
    }
}