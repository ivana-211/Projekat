export class Vezba {
    constructor(workout, boja, dan)
    {
        this.workout = workout;
        this.boja = boja;
        this.dan = dan;
        this.id = 0;
    }

    odrediBoju(boja, host)
    {
        if(boja == "siva")
        host.style.backgroundColor = "#ababab";
        else if(boja == "zelena")
        host.style.backgroundColor = "#008000";
        else if(boja == "plava")
        host.style.backgroundColor = "#008080";
        else if(boja == "zuta")
        host.style.backgroundColor = "#ffff52";
        else if(boja == "bela")
        host.style.backgroundColor = "FFFFFF";
        else host.style.backgroundColor = "#ffa500";
    }

    crtajVezbu(host)
    {
        let vezba = document.createElement("div");
        vezba.classList.add("vezba");
        vezba.innerHTML = this.workout;
        this.odrediBoju(this.boja, vezba);
        host.appendChild(vezba);
        vezba.onclick = (ev) =>
        {
            let forma = host.parentNode.parentNode.firstChild;
            let stavka = forma.querySelector(".Workout");
            stavka.value = this.workout;
            stavka = forma.querySelector(".selekcijaBoje");
            stavka.value = this.boja;
            stavka = forma.querySelector(".selekcijaDana");
            stavka.value = host.querySelector(".Naslov").innerHTML;
        }
    }

    azurirajVezbu(workout, boja)
    {
        this.workout = workout;
        this.boja = boja;
    }
}
