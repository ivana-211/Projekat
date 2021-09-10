using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VezbanjeController : ControllerBase
    {
        public VezbanjeContext Context {get; set;}

        public VezbanjeController(VezbanjeContext context)
        {
            Context = context;
        }

        [Route("PreuzmiNedelje")]
        [HttpGet]
        public async Task<List<Nedelja>> PreuzmiNedelje()
        {
            return await Context.Vezbanje.Include(p => p.Dani).ThenInclude(p => p.Vezbe).ToListAsync();
        }

        [Route("UpisiNedelju")]
        [HttpPost]
        public async Task UpisiNedelju([FromBody] Nedelja nedelja)
        {
            Context.Vezbanje.Add(nedelja);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniNedelju")]
        [HttpPut]
        public async Task IzmeniNedelju([FromBody] Nedelja nedelja)
        {
            Context.Update<Nedelja>(nedelja);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiNedelju/{id}")]
        [HttpDelete]
        public async Task<IActionResult>IzbrisiNedelju(int id)
        {
            Console.WriteLine(id);
            var nedelja = await Context.FindAsync<Nedelja>(id);
            Context.Remove(nedelja);
            await Context.SaveChangesAsync();
            return Ok(new JsonResult(nedelja.ID));
        }

        [Route("PreuzmiDane")]
        [HttpGet]
        public async Task<List<Dan>> PreuzmiDane()
        {
            return await Context.Dani.Include(p => p.Vezbe).ToListAsync();
        }

        [Route("UpisiDane/{idNedelje}")]
        [HttpPost]
        public async Task<IActionResult>UpisiDane(int idNedelje, [FromBody] Dan dan)
        {
            var nedelja = await Context.Vezbanje.FindAsync(idNedelje);
            dan.Nedelja = nedelja;
            Context.Dani.Add(dan);
            await Context.SaveChangesAsync();
            return Ok(new JsonResult(dan.ID));
        }

        [Route("IzbrisiDan/{id}")]
        [HttpDelete]
        public async Task IzbrisiDan(int id)
        {
            var dan = await Context.FindAsync<Dan>(id);
            Context.Remove(dan);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiVezbu/{idVezbe}")]
        [HttpGet]
        //public async Task<IActionResult>PreuzmiVezbu(int idVezbe, [FromBody] Vezba vezba)
        public async Task<Vezba> PreuzmiVezbu(int idVezbe)
        {
            return await Context.Vezbe.FindAsync(idVezbe);
            //await Context.SaveChangesAsync();
            //return Ok(new JsonResult(idVezbe));
        }

        [Route("UpisiVezbe/{idDana}")]
        [HttpPost]
        public async Task<IActionResult>UpisiVezbe(int idDana, [FromBody] Vezba vezba)
        {
            //Console.WriteLine(idDana);
            var dan = await Context.Dani.FindAsync(idDana);
            vezba.Dan = dan;
            Context.Vezbe.Add(vezba);
            await Context.SaveChangesAsync();
            return Ok(new JsonResult(vezba.ID));
        }

        [Route("IzmeniVezbu")]
        [HttpPut]
        public async Task IzmeniVezbu([FromBody] Vezba vezba)
        {
            Context.Vezbe.Update(vezba);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiVezbu/{id}")]
        [HttpDelete]
        //public async Task IzbrisiVezbu(int id)
        public async Task<IActionResult>IzbrisiVezbu(int id)
        {
            //Console.WriteLine(id);
            var vezba = await Context.FindAsync<Vezba>(id);
            Context.Vezbe.Remove(vezba);
            //await Context.SaveChangesAsync();
            return Ok(new JsonResult(vezba.ID));
        }
    }
}
