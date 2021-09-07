using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Models
{
    [Table("Vezbe")]
    public class Vezba
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Workout")]
        [MaxLength(255)]
        public string Workout {get; set;}

        [Column("Boja")]
        [MaxLength(255)]
        public string Boja {get; set;}

        [JsonIgnore]
        public Dan Dan {get; set;}
    } 
}