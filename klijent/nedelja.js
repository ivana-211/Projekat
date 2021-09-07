import { Dan } from "./dan.js";
import { Vezba } from "./vezba.js";

export class Nedelja {
    constructor(naziv, id)
    {
        this.ime = naziv;
        this.id = id;
        this.daniUNedelji = [];
        this.kontejner = null;
        const dani = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
        dani.forEach((naziv, id) =>
        {
            this.daniUNedelji.push(new Dan(naziv, id));
        });
    }

    crtaj(host)
    {
        let najveciKontejner = document.createElement("div");
        najveciKontejner.className = "najveciKontejner";
        host.appendChild(najveciKontejner);
        let naslov = document.createElement("h1");
        naslov.className = "naslovStrane";
        naslov.innerHTML = this.ime;
        najveciKontejner.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.className = "kontejner";
        najveciKontejner.appendChild(this.kontejner);
        this.crtajFormu(this.kontejner);
        this.crtajNedelju(this.kontejner);
    }

    crtajFormu(host)
    {
        const kontejnerForma = document.createElement("div");
        kontejnerForma.className = "kontejnerForma";
        host.appendChild(kontejnerForma);

        var naslovForme = document.createElement("h2");
        naslovForme.innerHTML = "Vezbanje";
        naslovForme.className = "naslovForme";
        kontejnerForma.appendChild(naslovForme);

        //vezba
        let divVezba = document.createElement("div");
        var labela = document.createElement("label");
        labela.innerHTML = "Unesi vezbu: ";
        divVezba.appendChild(labela);

        let unosVezbe = document.createElement("input");
        unosVezbe.className = "Workout";
        divVezba.appendChild(unosVezbe);
        kontejnerForma.appendChild(divVezba);

        //dan
        let opcija = null;
        let divDan = document.createElement("div");
        labela = document.createElement("label");
        labela.innerHTML = "Izaberi dan: ";
        let selekcijaDana = document.createElement("select");
        selekcijaDana.className = "selekcijaDana";
        divDan.appendChild(labela);
        divDan.appendChild(selekcijaDana);

        this.daniUNedelji.forEach((dan, i) =>
        {
            opcija = document.createElement("option");
            opcija.innerHTML = dan.naziv;
            opcija.value = dan.naziv;
            selekcijaDana.appendChild(opcija);
        })
        kontejnerForma.appendChild(divDan);

        //boja
        opcija = null;
        let divBoja = document.createElement("div");
        labela = document.createElement("label");
        labela.innerHTML = "Izaberi boju: ";
        let selekcijaBoje = document.createElement("select");
        selekcijaBoje.className = "selekcijaBoje";
        divBoja.appendChild(labela);
        divBoja.appendChild(selekcijaBoje);

        let boje = ["siva", "zuta", "zelena", "plava", "narandzasta", "bela"];
        boje.forEach((boja, i) =>
        {
            opcija = document.createElement("option");
            opcija.innerHTML = boja;
            opcija.value = boja;
            selekcijaBoje.appendChild(opcija);
        })
        kontejnerForma.appendChild(divBoja);

        //dugmeDodaj
        const dugmeDodaj = document.createElement("button");
        dugmeDodaj.innerHTML = "Dodaj";
        dugmeDodaj.className = "dugme";
        kontejnerForma.appendChild(dugmeDodaj);
        dugmeDodaj.onclick = (ev) =>
        {
            const naziv = kontejnerForma.querySelector(".Workout").value;
            const dan = selekcijaDana.value;
            const boja = selekcijaBoje.value;
            let i = this.daniUNedelji.findIndex(trazeniDan => trazeniDan.naziv == dan);
            this.daniUNedelji[i].dodajVezbu(naziv, boja);
        }

        //dugmeIzmeni
        const dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.innerHTML = "Izmeni";
        dugmeIzmeni.className = "dugme";
        kontejnerForma.appendChild(dugmeIzmeni);
        dugmeIzmeni.onclick = (ev) =>
        {
            const naziv = kontejnerForma.querySelector(".Workout").value;
            const dan = selekcijaDana.value;
            const boja = selekcijaBoje.value;
            let i = this.daniUNedelji.findIndex(trazeniDan => trazeniDan.naziv == dan);
            this.daniUNedelji[i].izmeniVezbu(naziv, boja);
        }

        //dugmeIzbrisi
        const dugmeIzbrisi = document.createElement("button");
        dugmeIzbrisi.innerHTML = "Izbrisi";
        dugmeIzbrisi.className = "dugme";
        kontejnerForma.appendChild(dugmeIzbrisi);
        dugmeIzbrisi.onclick = (ev) =>
        {
            this.azurirajSve();
        }
    }

    crtajNedelju(host)
    {
        const kontejnerNedelja = document.createElement("div");
        kontejnerNedelja.className = "kontejnerNedelja";
        host.appendChild(kontejnerNedelja);
        this.daniUNedelji.forEach((dan, i) =>
        {
            let kontejnerDan = document.createElement("div");
            kontejnerDan.className = "kontejnerDan";
            kontejnerNedelja.appendChild(kontejnerDan);
            dan.crtajDan(kontejnerDan);
        });
    }

    azurirajSve()
    {
        document.body.innerHTML = "";
        fetch("https://localhost:5001/Vezbanje/PreuzmiNedelje").then((res) =>
        {
            res.json().then((data) =>
                {
                    data.forEach((ned) =>
                    {
                        const novaNedelja = new Nedelja("Nova nedelja", ned.id);
                        novaNedelja.crtaj(document.body);
                    });
                });
        });
    }
}