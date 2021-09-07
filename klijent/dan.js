import { Vezba } from "./vezba.js"

export class Dan {
    constructor(ime, idBaza)
    {
        this.id = idBaza;
        this.naziv = ime;
        this.listaVezbi = [];
        this.kontejnerDana = null;
    }

    
    crtajDan(host)
    {
        this.kontejnerDana = host;
        let naslov = document.createElement("h2");
        naslov.innerHTML = this.naziv;
        naslov.className = "Naslov";
        this.kontejnerDana.appendChild(naslov);
        this.listaVezbi.forEach((vezba) =>
        {
            vezba.crtajVezbu(host);
        })
    }

    dodajVezbu(workout, boja)
    {
        if(this.listaVezbi.length > 3)
        {
            alert ("Previse vezbi za isti dan, izaberi drugi!");
        }
        else
        {
            if(!this.listaVezbi.find(p => (p.workout == workout || p.boja == boja) == undefined))
            {
                fetch("https://localhost:5001/Vezbanje/UpisiVezbe/" + this.id,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            workout: workout,
                            boja: boja,
                            dan: this.naziv,
                        })
                }).then(p =>
                    {
                        if(p.ok)
                        {
                            var id = 0;
                            p.json().then(p => id = p);
                            this.listaVezbi.push(new Vezba(workout, boja, this.naziv));
                            this.azurirajID;
                            this.azurirajDan();
                        }
                    });
            }
            else
            {
                alert("Vec postoji ta vezba/dan za taj dan!");
            }
        }
    }

    upisiVezbu(workout, boja)
    {
        this.listaVezbi.push(new Vezba(workout, boja, this));
        this.azurirajDan();
    }

    izmeniVezbu(workout, boja)
    {
        const i = this.listaVezbi.findIndex(p => p.workout == workout);
        fetch("https://localhost:5001/Vezbanje/IzmeniVezbu",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    workout: workout,
                    boja: boja,
                    dan: this.naziv,
                })
        }).then(p =>
            {
                if(p.ok)
                {
                    this.listaVezbi[i].azurirajVezbu(workout, boja);
                    this.azurirajDan();
                }
            })
    }

    azurirajDan()
    {
        while(this.kontejnerDana.firstChild)
        this.kontejnerDana.removeChild(this.kontejnerDana.lastChild);
        this.crtajDan(this.kontejnerDana);
    }

    azurirajID()
    {
        fetch("https://localhost:5001/Vezbanje/PreuzmiDane").then(p =>
        {
            p.json().then(data =>
                {
                    let i = data.findIndex(dan => dan.id == this.id)
                    i.vezbe.forEach((vezba, j) =>
                    {
                        this.listaVezbi[j].id = vezba.id;
                    });
                });
        });
    }
}