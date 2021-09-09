import { Nedelja } from "./nedelja.js";
import { Dan } from "./dan.js";
import { Vezba } from "./vezba.js";

/* const nedelja = new Nedelja("Prva nedelja", nedelja.id);
nedelja.daniUNedelji[0].dodajVezbu("cucnjevi", "zuta");
nedelja.daniUNedelji[0].dodajVezbu("sklekovi", "siva");
nedelja.daniUNedelji[1].dodajVezbu("trcanje", "zelena");
nedelja.daniUNedelji[1].dodajVezbu("trbusnjaci", "narandzasta");
nedelja.daniUNedelji[1].dodajVezbu("cucnjevi", "plava");
nedelja.daniUNedelji[2].dodajVezbu("sklekovi", "siva");
nedelja.daniUNedelji[2].dodajVezbu("preskakanje konopca", "zuta");
nedelja.daniUNedelji[3].dodajVezbu("daska", "plava");
nedelja.daniUNedelji[4].dodajVezbu("trcanje", "zelena");
nedelja.daniUNedelji[5].dodajVezbu("dan za odmor", "bela");
nedelja.daniUNedelji[6].dodajVezbu("dan za odmor", "bela");
nedelja.crtaj(document.body); */

fetch("https://localhost:5001/Vezbanje/PreuzmiNedelje").then(p =>
{
    p.json().then(data =>
        {
            data.forEach(nedelja =>
                {
                    const nedelja1 = new Nedelja("Trenutna nedelja", nedelja.id);
                    nedelja1.crtaj(document.body);
                });
        });
})
