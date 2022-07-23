var clicker = {
    fish:0,
    buildings:{
        bait:{
            amount:0,
            cost:15,
            fps:1/10,
            unlocked: false,
            unlock:0,
            name:"Bait",
            icon:0,
        },
        fisherman:{
            amount:0,
            cost:100,
            fps:1,
            unlocked: false,
            unlock:0,
            name:"Fisherman",
            icon:130,
        },
        fishingBoat:{
            amount:0,
            cost:1100,
            fps:8,
            unlocked: false,
            unlock:30,
            name:"Fishing Boat",
            icon:260,
        },
        pisciculture:{
            amount:0,
            cost:12000,
            fps:47,
            unlocked: false,
            unlock:100,
            name:"Pisciculture",
            icon:390,
        },
        imported:{
            amount:0,
            cost:130000,
            fps:260,
            unlocked: false,
            unlock:1100,
            name:"Imported",
            icon:510,
        },
    },
    upgrades:{
        bait1:{
            bought: false,
            buyable: 100,
            multiplier: 2,
            name: "bait 1",
        },
        bait2:{
            bought: false,
            buyable: 500,
            multiplier: 2,
            name: "bait 2",
        },
    },
};

var delay = 0;
var fps = 0;
//---------clicking, buying buildings, etc--------

function fish_click(fish){
    if(clicker.buildings[fish].cost <= clicker.fish){
    clicker.fish-= clicker.buildings[fish].cost;
    clicker.buildings[fish].amount++
    clicker.buildings[fish].cost += Math.round(clicker.buildings[fish].cost*0.15)
    update_buildings();
}
    
};

//---------updating fish counter & prices on the web page, save and load--------

function update_buildings(){
    var totalpersecond = 0;
    document.querySelector("#buildings").innerHTML="";
    for(i in clicker.buildings){
        if(clicker.buildings[i].unlocked){
        document.querySelector("#buildings").innerHTML+=`<button class="building" onclick="fish_click('${i}')"><div class="bicon" style="background: url(midia/buildings.png); background-size: 1170px; background-position-x: ${clicker.buildings[i].icon}; width: 70px; height: 70px;"></div> <div class="btext"><h3>${clicker.buildings[i].name}</h3> <div id="bstats"><p>${numberformat.format(clicker.buildings[i].cost)} fish</p> <p>${numberformat.format(clicker.buildings[i].amount)} owned.</p> </div></div> </button>`
        totalpersecond += clicker.buildings[i].fps * clicker.buildings[i].amount;
        }
    }
    fps = totalpersecond;
}
function updatecount(){
    if(Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined"){
        var clicker1 = JSON.parse(Cookies.get("clicker"));
        for(i in clicker.buildings){
            if(clicker1.buildings[i]==null){
                clicker1.buildings[i] = clicker.buildings[i];
            }
        }
        clicker = clicker1;
    }
    update_buildings();
    setInterval(() => {
    for(i in clicker.buildings){
        clicker.fish+=clicker.buildings[i].amount*clicker.buildings[i].fps/20;
    }
    document.querySelector("#counter").innerHTML = " "+ numberformat.format(Number(String(clicker.fish).split(".")[0]))+" fish";
    for(i in clicker.buildings){
        if(!clicker.buildings[i].unlocked && clicker.buildings[i].unlock <= clicker.fish){
            clicker.buildings[i].unlocked = true;
            update_buildings();
        }
    }
    document.querySelector("#fps").innerHTML = "per second: "+numberformat.format(fps);
    delay++;
    if(delay>=40){
        Cookies.set("clicker",JSON.stringify(clicker), {expires: 100000});
        Cookies.set("lasttime", Date.now(), {expires: 100000})
        delay = 0;
    }
    },50);
};

//fish click audio

var clicksound = null;
clicksound = "./fish.mp3";
var a = new Audio(clicksound);


// click animation
